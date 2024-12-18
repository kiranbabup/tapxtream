import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const schema = z.object({
  pnsHeader: z.string().min(1, "Header is required"),
  pnsPrice: z.number().min(0, "Price must be positive"),
  pnsDuration: z.string().optional(),
  pnsContent: z.string().optional(),
});

const UP = () => {
  const [loading, setLoading] = useState(false);
  const [productsAndServices, setProductsAndServices] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newCards, setNewCards] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    const fetchProductsAndServices = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userData = await getDoc(userDoc);

        if (userData.exists()) {
          const data = userData.data();
          setProductsAndServices(data.productsnservices || []);
        }
      }
    };

    fetchProductsAndServices();
  }, [user]);

  const storage = getStorage();

  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let productUrls = [];

      // Upload image(s) to Firebase Storage
      if (newImages.length > 0) {
        const uploadPromises = newImages.map((image, index) =>
          uploadImage(image, `productsnservices/${user.uid}/${index}`)
        );
        const newUrls = await Promise.all(uploadPromises);
        productUrls = newUrls;
      }

      // Prepare the new product entry
      const newProduct = {
        ...data,
        pnsImageUrl: productUrls[0] || "", // Assuming one image per product
      };

      // Update Firestore with the new product
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const existingData = userDoc.data();
        const updatedProducts = [...(existingData.productsnservices || []), newProduct];

        await updateDoc(userDocRef, {
          productsnservices: updatedProducts,
        });

        setProductsAndServices(updatedProducts); // Update local state
        setNewCards([...newCards, newProduct]); // Add new card dynamically
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDropImages = useCallback((acceptedFiles) => {
    setNewImages(acceptedFiles);
  }, []);

  const {
    getRootProps: getRootImageProps,
    getInputProps: getInputImageProps,
  } = useDropzone({
    onDrop: onDropImages,
    accept: "image/*",
  });

  return (
    <Box sx={{ pl: 2, pr: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Add Product/Service</Typography>

              {/* Upload image */}
              <Box
                {...getRootImageProps()}
                sx={{
                  border: "2px dashed #d3d3d3",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input {...getInputImageProps()} />
                {newImages.length > 0 ? (
                  <img
                    src={URL.createObjectURL(newImages[0])}
                    alt="Product Preview"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  <Typography>Drag & drop to upload or browse</Typography>
                )}
              </Box>
            </Grid>

            {/* Form inputs for pns-header, pns-price, pns-duration, pns-content */}
            <Grid item xs={12}>
              <TextField
                {...register("pnsHeader")}
                label="Header"
                fullWidth
                error={!!errors.pnsHeader}
                helperText={errors.pnsHeader?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("pnsPrice")}
                label="Price"
                fullWidth
                type="number"
                error={!!errors.pnsPrice}
                helperText={errors.pnsPrice?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField {...register("pnsDuration")} label="Duration" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField {...register("pnsContent")} label="Content" fullWidth multiline rows={3} />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Add Product"}
              </Button>
            </Grid>

            {/* Display Added Products as Cards */}
            <Grid item xs={12}>
              {productsAndServices.map((product, index) => (
                <Box key={index} sx={{ p: 2, border: "1px solid #ddd", mb: 2 }}>
                  <img src={product.pnsImageUrl} alt={`Product ${index}`} style={{ width: "100px", height: "100px" }} />
                  <Typography>{product.pnsHeader}</Typography>
                  <Typography>{product.pnsPrice}</Typography>
                  <Typography>{product.pnsDuration}</Typography>
                  <Typography>{product.pnsContent}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>

          {/* Add More Button */}
          <Button
            onClick={() => setNewCards([...newCards, {}])}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Add More
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UP;
