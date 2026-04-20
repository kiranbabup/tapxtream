import React, { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import companyLogo from "../data/images/tapxtream.png";
import sendOtpimg from "../data/paper-airplane.png";
import "./phoneSignup.css";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import gicon from "../data/images/GoogleGLogo.png";
import CustomButton from "../components/CustomButton";

const GmailRegister = () => {
  const [gmailError, setGmailError] = useState("");
  const auth = getAuth();

  const navigate = useNavigate();

  const handleGmailRegister = async () => {
    try {
      setGmailError("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const email = result.user.email;
      if (!email) throw new Error("No email found");

      // Check if user already exists
      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        // ✅ USER EXISTS → LOGIN
        const docSnap = snapshot.docs[0];

        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: docSnap.id,
            email: email,
            mobileNumber: docSnap.data().mobileNumber || "",
          }),
        );

        navigate("/user-profile");
      } else {
        // 🆕 USER DOES NOT EXIST → REGISTER
        const userDocRef = doc(collection(db, "users"));
        const uid = userDocRef.id;

        await setDoc(userDocRef, {
          uid: uid,
          email: email,
          mobileNumber: "",
          createdAt: Date.now(),
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: uid,
            email: email,
            mobileNumber: "",
          }),
        );

        navigate("/create-profile");
      }
    } catch (error) {
      console.error("Gmail registration error:", error);
      setGmailError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box
        component="img"
        alt="Company Logo"
        src={companyLogo}
        sx={{
          width: "65px",
          cursor: "pointer",
          display: { md: "none", xs: "block" },
          pl: 2,
          paddingTop: "10px",
        }}
        onClick={() => navigate("/")}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "start",
          height: { md: "100vh", xs: "calc(100vh - 68px)" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: { xs: "none", md: "block" },
          }}
        >
          {/* left */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              component="img"
              alt="Company Logo"
              src={companyLogo}
              sx={{
                width: "250px",
                // ml: 2,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
          </Box>
        </Box>
        {/* right */}
        <Box
          sx={{
            width: { md: "50%" },
            p: { xs: 2, md: 0 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: { md: "#577fd8d9" },
          }}
        >
          <Box sx={{ width: { md: "50%" } }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                alt="otp page"
                src={sendOtpimg}
                sx={{
                  width: "150px",
                  height: "150px",
                  // ml: 2,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              />
            </Box>
            <Typography
              gutterBottom
              sx={{
                fontSize: { xs: "1.5rem", md: "2.5rem" },
                fontWeight: "bold",
                textAlign: "center",
                color: { md: "white" },
              }}
            >
              Register Now
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ textAlign: "center", color: { md: "white" } }}
            >
              Register With Gmail.
            </Typography>

            <Box mt={2}>
              <CustomButton
                title="Register with Gmail"
                onPressed={handleGmailRegister}
                fullWidth
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  fontSize: { sm: 15, xs: 12 },
                  textTransform: "none",
                }}
                hoverColor="#1fd4af"
                hoverTxtColor="white"
                startIcon={
                  <Box
                    component="img"
                    alt="Google Register"
                    src={gicon}
                    sx={{ width: 28 }}
                  />
                }
              />
            </Box>

            {gmailError && (
              <Typography
                sx={{
                  color: "red",
                  mt: 1,
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                {gmailError}
              </Typography>
            )}
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 2,
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              color: { xs: "grey", md: "white" },
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              sx={{
                textDecoration: { xs: "none", md: "underline" },
                color: { md: "white" },
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GmailRegister;
