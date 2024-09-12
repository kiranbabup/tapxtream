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
} from "@mui/material";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

// Adjust the import based on your project structure

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
});

const UpdateProfile = () => {
  const navigate = useNavigate();
  // const auth = getAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        console.log("user", user);
        console.log("user-uid", user.uid);
        const userDoc = doc(db, "users", user.uid);
        const userData = await getDoc(userDoc);
        console.log("userData", userData.data())

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
        }
      }
    };

    fetchUserData();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(user, {
        displayName: `${data.firstName} ${data.middleName} ${data.lastName}`,
        photoURL: data.profileImage[0]
          ? URL.createObjectURL(data.profileImage[0])
          : user.photoURL,
      });
      alert("Profile updated successfully!");
      navigate("/update-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const [profileImage, setProfileImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);

  const onDropProfileImage = useCallback((acceptedFiles) => {
    setProfileImage(acceptedFiles[0]);
  }, []);

  const onDropCompanyLogo = useCallback((acceptedFiles) => {
    setCompanyLogo(acceptedFiles[0]);
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
        src={profileImage ? URL.createObjectURL(profileImage) : user?.photoURL || ""}
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
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
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
              {companyLogo ? (
                <img
                  src={URL.createObjectURL(companyLogo)}
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
              helperText={
                errors.instagramUrl ? errors.instagramUrl.message : ""
              }
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
              helperText={
                errors.mobileNumber ? errors.mobileNumber.message : ""
              }
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
              helperText={
                errors.whatsAppNumber ? errors.whatsAppNumber.message : ""
              }
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
            <Button type="submit" variant="contained" color="primary">
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateProfile;
