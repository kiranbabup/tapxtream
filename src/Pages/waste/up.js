import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography, Grid, Avatar, Modal, CircularProgress, IconButton, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import OutputIcon from '@mui/icons-material/Output';
import QRCodeModal from "../QRCodeModal";

const schema = z.object({
  clientImage: z.any().optional(),
});

const UP = () => {
  const [loading, setLoading] = useState(false);

  const [clientImages, setClientImages] = useState([]);
  const [newClientImages, setNewClientImages] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userData = await getDoc(userDoc);

        if (userData.exists()) {
          const data = userData.data();
          setClientImages(data.clientImages || []);
        }
      }
    };

    fetchUserData();
  }, []);

  const storage = getStorage();

  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let clientImageUrls = [...clientImages];

      if (newClientImages.length > 0) {
        const uploadPromises = newClientImages.map((image, index) =>
          uploadImage(image, `clientImages/${user.uid}/${clientImageUrls.length + index}`)
        );
        const newUrls = await Promise.all(uploadPromises);
        clientImageUrls = [...clientImageUrls, ...newUrls];
      }
      const userDocRef = doc(db, "users", user.uid);
      const updatedData = {
        ...data,
        clientImages: clientImageUrls,
      };

      await updateDoc(userDocRef, updatedData);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDropClientImages = useCallback((acceptedFiles) => {
    setNewClientImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const {
    getRootProps: getRootClientImages,
    getInputProps: getInputClientImages,
  } = useDropzone({
    onDrop: onDropClientImages,
    accept: "image/*",
  });

  return (
    <Box sx={{ pl: 2, pr: 2, }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Grid container spacing={2} >
            
            <Grid item xs={12}>
              <Typography variant="h6">Upload Client Logos</Typography>
              <Box
                {...getRootClientImages()}
                sx={{
                  border: "2px dashed #d3d3d3",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input {...getInputClientImages()} />
                {newClientImages.length > 0 ? (
                  newClientImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Client image Preview ${index}`}
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                        marginBottom: "10px",
                      }}
                    />
                  ))
                ) : (
                  <Typography>Drag & drop to upload or browse</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Existing Client Logos</Typography>
              <Box sx={{
                display: "flex", flexWrap: "wrap", justifyContent: "space-evenly",
                gap: "10px", p: "15px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                borderRadius: "10px",
              }}>
                {clientImages.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Client image ${index}`}
                    style={{
                      width: "130px",
                      height: "130px",
                    }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Add Your Product and Services</Typography>

            </Grid>


            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >

              <Button type="submit" variant="contained" color="primary" disabled={loading}
                sx={{ fontSize: { xs: "10px", md: "1rem" } }}
              >
                {loading ? <CircularProgress size={24} /> : "Update Profile"}
              </Button>
            </Grid>
          </Grid>
          <Box p={1} />
        </form>
      </Box>
    </Box>
  );
};

export default UP;
