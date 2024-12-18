import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/mainComponents/HeaderComponent";
import companyLogo from "../data/Inv_logo-Horizontal.png";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const SignUp = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      navigate("/update-profile");
    }
  }, [user, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState(null);

  const onSubmit = async (data) => {
    const auth = getAuth();
    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      setVerificationSent(true);

      // console.log("Verification email sent!");

      // Notify the user to check their email and verify
      alert(
        "Please check your email for verification. After verifying, log-in to complete registration."
      );
    } catch (error) {
      setVerificationError(error.message);
      console.error("Error during signup:", error);
    }
  };

  return (
    <Box sx={{
      height: "100vh",
    }}>
      <HeaderComponent />
      <Box
        sx={{ height: "10vh" }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: { md: "calc(100vh - 10vh)" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            // backgroundColor: "#3f51b5",
            display: { xs: "none", md: "block" },
          }}
        >
          <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", height:"100%"}}>
            <Box component="img"
                alt="Company Logo"
                src={companyLogo}
                sx={{
                    width: "500px",
                    ml: 2,
                    cursor: "pointer",
                }}
                onClick={() => navigate('/')}
            />
          </Box>
          {/* Add your background image or design here */}
        </Box>
        <Box
          sx={{
            width: { md: "40%" },
            p: { xs: 2, md: 4 },
            pt: { xs: 8, md: 0 },
            // height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // border: "2px solid red",
          }}
        >
          <Typography
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight:"bold", color:"#fd710b", textAlign:"center" }}
          >
            Register Now
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
          >
            Welcome to TAPXTREAM!
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
          >
            Get registered for an unique Profile.
          </Typography>
          {verificationSent ? (
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "10px",
              }}
            >
              A verification email has been sent. Please verify your email before
              continuing.
            </Typography>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, fontSize: { xs: "0.875rem", md: "1rem" } }}
              >
                Sign Up
              </Button>
            </form>
          )}
          {verificationError && (
            <Typography color="error">{verificationError}</Typography>
          )}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, fontSize: { xs: "0.75rem", md: "0.875rem" } }}
          >
            Already have an account? <Link href="/login">Login</Link>.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
