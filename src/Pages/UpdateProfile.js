import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography, Grid, Avatar, Modal, CircularProgress, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import OutputIcon from '@mui/icons-material/Output';
import QRCodeModal from "./QRCodeModal";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  facebookUrl: z.string().url({ message: "Invalid URL" }).optional(),
  instagramUrl: z.string().url({ message: "Invalid URL" }).optional(),
  twitterUrl: z.string().url({ message: "Invalid URL" }).optional(),
  linkedInUrl: z.string().url({ message: "Invalid URL" }).optional(),
  mobileNumber: z.string().min(10, { message: "Invalid mobile number" }),
  websiteUrl: z.string().url({ message: "Invalid URL" }).optional(),
  whatsAppNumber: z.string().min(10, { message: "Invalid WhatsApp number" }),
  about: z.string().optional(),
  profileImage: z.any().optional(),
  companyLogo: z.any().optional(),
  companyName: z.string().min(1, { message: "Company name is required" }),
  designation: z.string().min(1, { message: "Designation is required" }),
});

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    register, watch, handleSubmit, setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [profileImage, setProfileImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newCompanyLogo, setNewCompanyLogo] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userData = await getDoc(userDoc);

        if (userData.exists()) {
          const data = userData.data();
          setValue("firstName", data.firstName || "");
          setValue("middleName", data.middleName || "");
          setValue("lastName", data.lastName || "");
          setValue("email", data.email || "");
          setValue("facebookUrl", data.facebookUrl || "");
          setValue("instagramUrl", data.instagramUrl || "");
          setValue("twitterUrl", data.twitterUrl || "");
          setValue("linkedInUrl", data.linkedInUrl || "");
          setValue("mobileNumber", data.mobileNumber || "");
          setValue("websiteUrl", data.websiteUrl || "");
          setValue("whatsAppNumber", data.whatsAppNumber || "");
          setValue("about", data.about || "");
          setValue("companyName", data.companyName || "");
          setValue("designation", data.designation || "");

          // Set the initial state for profileImage and companyLogo
          setProfileImage(data.profileImage || null);
          setCompanyLogo(data.companyLogo || null);
        }
      }
    };

    fetchUserData();
  }, [user, setValue]);

  const storage = getStorage();

  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let profileImageUrl = profileImage;
      let companyLogoUrl = companyLogo;

      if (newProfileImage) {
        profileImageUrl = await uploadImage(newProfileImage, `profileImages/${user.uid}`);
      }

      if (newCompanyLogo) {
        companyLogoUrl = await uploadImage(newCompanyLogo, `companyLogos/${user.uid}`);
      }

      const userDocRef = doc(db, "users", user.uid);
      const updatedData = {
        ...data,
        profileImage: profileImageUrl,
        companyLogo: companyLogoUrl,
      };

      await updateDoc(userDocRef, updatedData);
      setOpenModal(true);
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate(`/profile/${user.uid}`);
  };

  const onDropProfileImage = useCallback((acceptedFiles) => {
    setNewProfileImage(acceptedFiles[0]);
  }, []);

  const onDropCompanyLogo = useCallback((acceptedFiles) => {
    setNewCompanyLogo(acceptedFiles[0]);
  }, []);

  const {
    getRootProps: getRootPropsProfile,
    getInputProps: getInputPropsProfile,
  } = useDropzone({
    onDrop: onDropProfileImage,
    accept: "image/*",
  });

  const {
    getRootProps: getRootPropsLogo,
    getInputProps: getInputPropsLogo,
  } = useDropzone({
    onDrop: onDropCompanyLogo,
    accept: "image/*",
  });

  const onLogoutClick = () => {
    localStorage.removeItem("user");
    navigate('/');
  };

  const [openQR, setOpenQR] = useState(false);

  const handleShowQRClick = () => {
    setOpenQR(true);
  };

  const handleCloseQR = () => {
    setOpenQR(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end", m: 1 }}>
        <IconButton onClick={() => onLogoutClick()}><OutputIcon large /></IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Update Profile
        </Typography>
        <Avatar
          alt="Profile Picture"
          src={newProfileImage ? URL.createObjectURL(newProfileImage) : profileImage || user?.photoURL || ""}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography sx={{ mb: 2, mt: 2 }} >
          {watch("email")}
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="filled"
                fullWidth
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Middle Name"
                variant="filled"
                fullWidth
                {...register("middleName")}
                error={!!errors.middleName}
                helperText={errors.middleName ? errors.middleName.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="filled"
                fullWidth
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company Name"
                variant="filled"
                fullWidth
                {...register("companyName")}
                error={!!errors.companyName}
                helperText={errors.companyName ? errors.companyName.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Designation"
                variant="filled"
                fullWidth
                {...register("designation")}
                error={!!errors.designation}
                helperText={errors.designation ? errors.designation.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Previously Uploaded Images</Typography>
              {profileImage && typeof profileImage === "string" && !newProfileImage && (
                <Box
                  sx={{
                    border: "2px dashed #d3d3d3",
                    padding: "20px",
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  <img
                    src={profileImage}
                    alt="Profile Preview"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
              {companyLogo && typeof companyLogo === "string" && !newCompanyLogo && (
                <Box
                  sx={{
                    border: "2px dashed #d3d3d3",
                    padding: "20px",
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  <img
                    src={companyLogo}
                    alt="Company Logo Preview"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Profile Image</Typography>
              <Box
                {...getRootPropsProfile()}
                sx={{
                  border: "2px dashed #d3d3d3",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input {...getInputPropsProfile()} />
                {newProfileImage ? (
                  <img
                    src={URL.createObjectURL(newProfileImage)}
                    alt="Profile Preview"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Typography>Drag & drop to upload or browse</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Company Logo</Typography>
              <Box
                {...getRootPropsLogo()}
                sx={{
                  border: "2px dashed #d3d3d3",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input {...getInputPropsLogo()} />
                {newCompanyLogo ? (
                  <img
                    src={URL.createObjectURL(newCompanyLogo)}
                    alt="Company Logo Preview"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Typography>Drag & drop to upload or browse</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Facebook URL"
                variant="filled"
                fullWidth
                {...register("facebookUrl")}
                error={!!errors.facebookUrl}
                helperText={errors.facebookUrl ? errors.facebookUrl.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Instagram URL"
                variant="filled"
                fullWidth
                {...register("instagramUrl")}
                error={!!errors.instagramUrl}
                helperText={errors.instagramUrl ? errors.instagramUrl.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Twitter URL"
                variant="filled"
                fullWidth
                {...register("twitterUrl")}
                error={!!errors.twitterUrl}
                helperText={errors.twitterUrl ? errors.twitterUrl.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="LinkedIn URL"
                variant="filled"
                fullWidth
                {...register("linkedInUrl")}
                error={!!errors.linkedInUrl}
                helperText={errors.linkedInUrl ? errors.linkedInUrl.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile Number"
                variant="filled"
                fullWidth
                {...register("mobileNumber")}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber ? errors.mobileNumber.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website URL"
                variant="filled"
                fullWidth
                {...register("websiteUrl")}
                error={!!errors.websiteUrl}
                helperText={errors.websiteUrl ? errors.websiteUrl.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="WhatsApp Number"
                variant="filled"
                fullWidth
                {...register("whatsAppNumber")}
                error={!!errors.whatsAppNumber}
                helperText={errors.whatsAppNumber ? errors.whatsAppNumber.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="About"
                variant="filled"
                fullWidth
                multiline
                rows={4}
                {...register("about")}
                error={!!errors.about}
                helperText={errors.about ? errors.about.message : ""}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/update-profile")}
                sx={{fontSize:{xs:"10px", md:"1rem"}}}
              >
                Cancel
              </Button>

              <Button variant="outlined" onClick={() => handleShowQRClick()}
                sx={{fontSize:{xs:"10px", md:"1rem"}}}
                >Show QR</Button>
              <QRCodeModal open={openQR} onClose={handleCloseQR} />

              <Button type="submit" variant="contained" color="primary" disabled={loading}
                sx={{fontSize:{xs:"10px", md:"1rem"}}}
                >
                {loading ? <CircularProgress size={24} /> : "Update Profile"}
              </Button>
            </Grid>
          </Grid>
            <Box p={1}/>
        </form>

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              borderRadius: '10px',
              boxShadow: 24,
              p: 2,
              textAlign: 'center',
            }}
          >
            <Typography id="modal-title" variant="h6" component="h3" gutterBottom>
              Profile updated successfully
            </Typography>
            <Button onClick={()=>handleCloseModal()} variant="contained" color="primary" sx={{ mt: 2 }}>
              See your profile
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default UpdateProfile;
