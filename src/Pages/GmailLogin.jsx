import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import companyLogo from "../data/images/tapxtream.png";
import gicon from "../data/images/GoogleGLogo.png";
import CustomButton from "../components/CustomButton";
import sendOtpimg from "../data/Loginicon.png";

const GmailLogin = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const auth = getAuth();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      navigate("/user-profile");
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      if (!email) throw new Error("No email found");
      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setErrorMsg("Please register to continue");
        return;
      }

      const docSnap = snapshot.docs[0];
      const userData = docSnap.data();

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: docSnap.id,
          email,
          mobileNumber: userData.mobileNumber || "",
          review: userData.reviewAccess || false,
        })
      );

      navigate("/user-profile");
    } catch (error) {
      console.error("Google login error:", error);
      setErrorMsg("Google login failed");
    }
  };

  return (
    <Box sx={{ height: "100vh" }}>
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
          {/* Left section (large screens) */}
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
              sx={{ width: "250px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>
        </Box>
        {/* Right section */}
        <Box
          sx={{
            width: { md: "50%" },
            p: { xs: 2, md: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: { md: "#577fd8d9" },
            height: "100%",
            // backgroundColor: { md: "aliceblue" }
          }}
        >
          <Box sx={{ width: { md: "50%" }}}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                alt="otp page"
                src={sendOtpimg}
                sx={{
                  width: "130px",
                  height: "140px",
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
              Login Now !
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ textAlign: "center", color: { md: "white" } }}
            >
              Existing User Login with Gmail.
            </Typography>
            <Box p={2} />
            <CustomButton
              title="Login with Gmail"
              onPressed={handleGoogleSignIn}
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
                  alt="Google Login"
                  src={gicon}
                  sx={{ width: 32 }}
                />
              }
            />

            {errorMsg !== "" && (
              <Typography sx={{ color: "red", mt: 2, textAlign: "center" }}>
                {errorMsg}
              </Typography>
            )}

            <Typography
              sx={{
                mt: 3,
                fontSize: { xs: "0.85rem", md: "0.9rem" },
                color: { xs: "grey", md: "white" },
              }}
            >
              Don’t have an account?{" "}
              <a
                href="/register-now"
                style={{
                  textDecoration: "underline",
                  color: isMdScreen ? "white" : "#1976d2",
                }}
              >
                Register now
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GmailLogin;
