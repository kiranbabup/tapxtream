import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography, Grid, CircularProgress, IconButton, } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getRupee } from "../data/styles";
import UserHeaderComponent from "../components/mainComponents/UserHeaderComponent";

const schema = z.object({
  pnsHeader: z.string().min(1, "Header is required"),
  pnsPrice: z.string().min(0, "Price must be positive"),
  pnsDuration: z.string().optional(),
  pnsContent: z.string().optional(),
});

const ProductsNServices = () => {
  const [loading, setLoading] = useState(false);
  const [addData, setAddData] = useState(false);
  const [expandedStates, setExpandedStates] = useState(false);
  const [productsAndServices, setProductsAndServices] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newCards, setNewCards] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) });

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
          uploadImage(image, `productsnservices/${user.uid}/${Date.now()}_${index}`)
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
        setProductsAndServices(updatedProducts);
        setNewCards([...newCards, newProduct]);
        setAddData(false);
        reset();
        setNewImages([]);
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
  const toggleText = (index) => {
    setExpandedStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (

    <Box sx={{
      width: "100vw",
      // background: "black",
    }}>
      <UserHeaderComponent />
      <Box sx={{ height: "10vh" }} ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" textAlign="center">Add Product/Service</Typography>
        <Box p={1} />
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-evenly" }
        }}>

          <Grid item xs={12}>
            <Box sx={{
              display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: "10px", p: 2,
            }}>
              {productsAndServices.map((product, index) => (
                <Box key={index} sx={{
                  p: 2, mb: 2, borderRadius: "10px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  width: "320px",
                }}>
                  <img src={product.pnsImageUrl} alt={`Product ${index}`} style={{ width: "100%", height: "8rem" }} />
                  <Typography><span style={{ fontWeight: "bold" }}>Price:</span> {getRupee(product.pnsPrice)}/{product.pnsDuration}</Typography>
                  <Typography variant="h6">{product.pnsHeader}</Typography>
                  {/* <Typography>{product.pnsContent}</Typography> */}
                  <Typography sx={{
                    textAlign: "justify",
                    display: "block",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}>
                    {expandedStates[index] ? product.pnsContent : `${product.pnsContent.slice(0, 100)}...`}
                    <Button sx={{ fontSize: "10px", }} onClick={() => toggleText(index)}>
                      {expandedStates[index] ? "Show Less" : "Show More"}
                    </Button>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {!addData && (
            <Box sx={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "10px", width: "130px", height: "260px", display: "flex", justifyContent: "center", alignItems: "center"
            }}>
              <IconButton
                onClick={() => setAddData(true)}
                variant="outlined"
              // sx={{ mt: 2 }}
              >
                <span style={{ padding: 3, border: "4px dashed #1976d2", borderRadius: "50%", color: "#1976d2", width: "3rem", height: "3rem", display: "flex", justifyContent: "center", alignItems: "center" }}>+</span>
              </IconButton>
            </Box>
          )}
        </Box>

        {addData && (
          // <Box >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ minWidth: "300px", maxWidth: "600px", display: "flex", justifyContent: "center", }}
          >
            <Grid container spacing={2} sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: "10px", p: 1 }}>
              <Grid item xs={12}>
                <Typography>Add Product/Service Image</Typography>
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

              <Grid item xs={12}>
                <Typography>Header</Typography>
                <TextField
                  {...register("pnsHeader")}
                  placeholder="Product or Service Header"
                  fullWidth
                  error={!!errors.pnsHeader}
                  helperText={errors.pnsHeader?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Price</Typography>
                <TextField
                  {...register("pnsPrice")}
                  type="number"
                  fullWidth
                  error={!!errors.pnsPrice}
                  helperText={errors.pnsPrice?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Duration</Typography>

                <TextField
                  select
                  {...register("pnsDuration")}

                  fullWidth

                  SelectProps={{ native: true }}

                >
                  <option value="">Select Duration</option>
                  <option value="per hour">Per Hour</option>
                  <option value="per day">Per Day</option>
                  <option value="per week">Per Week</option>
                  <option value="per month">Per Month</option>
                  <option value="per year">Per Year</option>
                  <option value="lifetime">Lifetime</option>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register("pnsContent")} placeholder="Content"
                  fullWidth multiline rows={3} />
              </Grid>

              <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outlined" color="primary" onClick={() => {
                  setAddData(false);
                  reset();
                  setNewImages([]);
                }}>Cancel
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ fontSize: { xs: "10px", md: "1rem" } }}>
                  {loading ? <CircularProgress size={24} /> : "Add Product/Service"}
                </Button>
              </Grid>

            </Grid>
          </form>
          // </Box>
        )}
      </Box>
      <Box p={2} />
    </Box >
  );
};

export default ProductsNServices;
