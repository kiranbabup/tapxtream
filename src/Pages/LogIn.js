import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";
import { collection, addDoc, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const LogIn = () => {
  const user = localStorage.getItem("user");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/update-profile");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const auth = getAuth();
    setLoginError(""); // Clear previous errors
    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Check if email is verified
      if (user.emailVerified) {
        // console.log("Email verified!");
        localStorage.setItem("user", JSON.stringify(user));
        // console.log(user);
        await checkAndStoreUser(user.email, user.emailVerified, user.uid);
      } else {
        alert("Please verify your email before proceeding.");
      }
    } catch (error) {
      // Check for wrong password error
      if (error.code === "auth/wrong-password") {
        setLoginError("Password is incorrect.");
      } else if (error.code === "auth/user-not-found") {
        setLoginError("User not found. Please check your email.");
      } else {
        setLoginError("An error occurred during login.");
      }
      console.error("Error during login:", error);
    }
  };

  const checkAndStoreUser = async (email, emailVerified, uid) => {
    try {
      // Check if user already exists in Firestore
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userSnapshot = await getDocs(userQuery);
      if (userSnapshot.empty) {
        // User does not exist in Firestore, so add new user
        const userDocRef = doc(collection(db, "users"), uid);
        await setDoc(userDocRef, { email, emailVerified, uid });
        // console.log("User data stored in Firestore");
        navigate("/update-profile");
      } else {
        // console.log("User already exists in Firestore");
        navigate("/update-profile");
      }
    } catch (error) {
      console.error("Error storing user data in Firestore:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          backgroundColor: "#3f51b5",
          display: { xs: "none", md: "block" },
        }}
      >
        {/* Add your background image or design here */}
      </Box>

      <Box
        sx={{
          width: { md: "30%" },
          p: { xs: 2, md: 4 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // border: "2px solid red",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
        >
          Welcome back!
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
        >
          Enter to get unlimited access to data & information.
        </Typography>

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
          {loginError && (
            <Typography color="error" sx={{ fontSize: "0.875rem", mt: 1 }}>
              {loginError}
            </Typography>
          )}
          {/* <FormControlLabel
            control={<Checkbox {...register("rememberMe")} />}
            label="Remember me"
            sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
          /> */}
          {/* <Link
            href="#"
            variant="body2"
            sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
          >
            Forgot your password?
          </Link> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, fontSize: { xs: "0.875rem", md: "1rem" } }}
          >
            Log In
          </Button>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, fontSize: { xs: "0.75rem", md: "0.875rem" } }}
        >
          Don’t have an account? <Link href="/signup">Register here</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LogIn;
