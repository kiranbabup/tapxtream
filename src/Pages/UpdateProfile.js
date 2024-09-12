import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Avatar,
  Modal,
  CircularProgress,
} from "@mui/material";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  userName: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
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
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

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
          setValue("userName", data.userName || "");
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Middle Name"
              variant="outlined"
              fullWidth
              {...register("middleName")}
              error={!!errors.middleName}
              helperText={errors.middleName ? errors.middleName.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              {...register("userName")}
              error={!!errors.userName}
              helperText={errors.userName ? errors.userName.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Name"
              variant="outlined"
              fullWidth
              {...register("companyName")}
              error={!!errors.companyName}
              helperText={errors.companyName ? errors.companyName.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Designation"
              variant="outlined"
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
              variant="outlined"
              fullWidth
              {...register("facebookUrl")}
              error={!!errors.facebookUrl}
              helperText={errors.facebookUrl ? errors.facebookUrl.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Instagram URL"
              variant="outlined"
              fullWidth
              {...register("instagramUrl")}
              error={!!errors.instagramUrl}
              helperText={errors.instagramUrl ? errors.instagramUrl.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Twitter URL"
              variant="outlined"
              fullWidth
              {...register("twitterUrl")}
              error={!!errors.twitterUrl}
              helperText={errors.twitterUrl ? errors.twitterUrl.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LinkedIn URL"
              variant="outlined"
              fullWidth
              {...register("linkedInUrl")}
              error={!!errors.linkedInUrl}
              helperText={errors.linkedInUrl ? errors.linkedInUrl.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              {...register("mobileNumber")}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber ? errors.mobileNumber.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Website URL"
              variant="outlined"
              fullWidth
              {...register("websiteUrl")}
              error={!!errors.websiteUrl}
              helperText={errors.websiteUrl ? errors.websiteUrl.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="WhatsApp Number"
              variant="outlined"
              fullWidth
              {...register("whatsAppNumber")}
              error={!!errors.whatsAppNumber}
              helperText={errors.whatsAppNumber ? errors.whatsAppNumber.message : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="About"
              variant="outlined"
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
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/update-profile")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Update Profile"}
            </Button>
          </Grid>
        </Grid>
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
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Profile updated successfully
          </Typography>
          <Button onClick={handleCloseModal} variant="contained" color="primary" sx={{ mt: 2 }}>
            See your profile
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default UpdateProfile;