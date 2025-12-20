import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import companyLogo from "../data/images/tapxtream.png";
import sendOtpimg from "../data/Loginicon.png";
import otpimgSent from "../data/OTP.png";
import "./phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../data/styles";
import PinInput from "react-pin-input";
import gicon from "../data/images/GoogleGLogo.png";
import CustomButton from "../components/CustomButton";

const countryCodes = [
  { code: "+91", label: "India (+91)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+1", label: "US (+1)" },
  { code: "+7", label: "Russia (+7)" },
  { code: "+20", label: "Egypt (+20)" },
  { code: "+27", label: "South Africa (+27)" },
  { code: "+30", label: "Greece (+30)" },
  { code: "+31", label: "Netherlands (+31)" },
  { code: "+32", label: "Belgium (+32)" },
  { code: "+33", label: "France (+33)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+36", label: "Hungary (+36)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+40", label: "Romania (+40)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+52", label: "Mexico (+52)" },
  { code: "+53", label: "Cuba (+53)" },
  { code: "+54", label: "Argentina (+54)" },
  { code: "+55", label: "Brazil (+55)" },
  { code: "+57", label: "Colombia (+57)" },
  { code: "+60", label: "Malaysia (+60)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+62", label: "Indonesia (+62)" },
  { code: "+63", label: "Philippines (+63)" },
  { code: "+64", label: "New Zealand (+64)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+66", label: "Thailand (+66)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+82", label: "South Korea (+82)" },
  { code: "+84", label: "Vietnam (+84)" },
  { code: "+86", label: "China (+86)" },
  { code: "+90", label: "Turkey (+90)" },
  { code: "+92", label: "Pakistan (+92)" },
  { code: "+93", label: "Afghanistan (+93)" },
  { code: "+94", label: "Sri Lanka (+94)" },
  { code: "+98", label: "Iran (+98)" },
  { code: "+212", label: "Morocco (+212)" },
  { code: "+213", label: "Algeria (+213)" },
  { code: "+216", label: "Tunisia (+216)" },
  { code: "+218", label: "Libya (+218)" },
  { code: "+351", label: "Portugal (+351)" },
  { code: "+358", label: "Finland (+358)" },
  { code: "+353", label: "Ireland (+353)" },
  { code: "+972", label: "Israel (+972)" },
  { code: "+380", label: "Ukraine (+380)" },
  // add more or remove entries here to cover all countries which firebase availble for otp
];

const EmailLoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpsent, setIsOtpsent] = useState(false);
  const [timer, setTimer] = useState(80);
  const [isActive, setIsActive] = useState(false);
  const [isOtpsentLoading, setIsOtpsentLoading] = useState(false);
  const [numErrorMsg, setNumErrorMsg] = useState("");
  const [otpEntered, setOtpEntered] = useState("");
  const [otpErrorMsg, setOtpErrorMsg] = useState("");
  const [isConfirmOtpLoading, setIsConfirmOtpLoading] = useState(false);
  const [countryCode, setcountryCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const navigate = useNavigate();

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const auth = getAuth();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      navigate("/user-profile");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          // callback: () => {
          //   console.log("reCAPTCHA solved");
          // },
        }
      );

      window.recaptchaVerifier.render();
    }
    return () => {
    // ✅ prevent duplicate instances in dev strict mode
    window.recaptchaVerifier?.clear();
    window.recaptchaVerifier = null;
  };
  }, [auth]);

  useEffect(() => {
    let interval;
    if (timer > 0 && !isActive && isOtpsent) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); // 1000
    } else if (timer === 0 && !isActive) {
      setIsActive(true);
    }
    return () => clearInterval(interval);
  }, [timer, isActive, isOtpsent]);

  const onTypingChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setNumErrorMsg("");
      setPhoneNumber(value);
    }
  };

  const sendOtptoPhone = async () => {
    if (!countryCode) {
      setNumErrorMsg("Select country code");
      return;
    }

    if (!phoneNumber || phoneNumber.length < 6 || phoneNumber.length > 15) {
      setNumErrorMsg("Enter a valid phone number");
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      if (!window.recaptchaVerifier) {
        throw new Error("reCAPTCHA not initialized");
      }
      const appVerifier = window.recaptchaVerifier;

      setIsOtpsentLoading(true);
      setNumErrorMsg("");

      // ✅ Check existing user
      const q = query(
        collection(db, "users"),
        where("mobileNumber", "==", fullPhoneNumber)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setNumErrorMsg("Please register to continue");
        return;
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        appVerifier
      );

      setConfirmationResult(confirmation);
      setIsOtpsent(true);
      setTimer(80);
    } catch (error) {
      console.error("OTP send error:", error);
      if (error.code === "auth/timeout") {
      setNumErrorMsg("reCAPTCHA timeout. Please try again.");
    } else {
      setNumErrorMsg("Failed to send OTP");
    }
    } finally {
      setIsOtpsentLoading(false);
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    setIsActive(false);
    setOtpEntered("");
    sendOtptoPhone();
  };

  const handleSubmit = async () => {
    if (!otpEntered || otpEntered.length < 6) {
      setOtpErrorMsg("Enter valid OTP");
      return;
    }

    try {
      setIsConfirmOtpLoading(true);

      const result = await confirmationResult.confirm(otpEntered);
      const phone = result.user.phoneNumber;

      const q = query(
        collection(db, "users"),
        where("mobileNumber", "==", phone)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setOtpErrorMsg("User not registered");
        return;
      }

      const docSnap = snapshot.docs[0];
      const userData = docSnap.data();

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: docSnap.id,
          mobileNumber: phone,
          email: userData.email || "",
          review: userData.reviewAccess || false,
        })
      );

      navigate("/user-profile");
    } catch (error) {
      console.error("OTP verification error:", error);
      setOtpErrorMsg("Invalid or expired OTP");
    } finally {
      setIsConfirmOtpLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const email = result.user.email;
      if (!email) throw new Error("No email found");

      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setNumErrorMsg("Please register to continue");
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
      setNumErrorMsg("Google login failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <div id="recaptcha-container"></div>
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
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: { md: "#577fd8d9" },
            height: "100%",
            // backgroundColor: { md: "aliceblue" }
          }}
        >
          {!isOtpsent ? (
            <Box sx={{ width: { md: "50%" } }}>
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
                We will send you an One Time Password(OTP) to the given Phone
                Number or Login with Gmail.
              </Typography>
              <Box p={2} />
              <Typography
                sx={{
                  textAlign: "center",
                  width: "100%",
                  fontWeight: "bold",
                  color: { md: "white" },
                }}
              >
                Enter Phone Number
              </Typography>
              <Box p={0.5} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Select
                  size="small"
                  value={countryCode}
                  onChange={(e) => setcountryCode(e.target.value)}
                  displayEmpty
                  disabled={isOtpsentLoading}
                  sx={{
                    // "& .MuiSelect-select": { padding: "10px 12px" },
                    backgroundColor: "white",
                    color: "black",
                    width: "12rem",
                  }}
                >
                  {countryCodes.map((c) => (
                    <MenuItem key={c.code} value={c.code}>
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  variant="standard"
                  fullWidth
                  required
                  placeholder="Enter Number"
                  disabled={isOtpsentLoading}
                  value={phoneNumber}
                  inputProps={{
                    maxLength: 12,
                    inputMode: "numeric",
                    style: {
                      textAlign: "left",
                      fontWeight: "bold",
                      paddingLeft: "8px",
                    },
                    sx: { color: { md: "white" } },
                  }}
                  onChange={(e) => {
                    onTypingChange(e);
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "-" ||
                      e.key === "." ||
                      e.key === "e" ||
                      e.key === "+"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </Box>
              <Box p={0.5} />
              {numErrorMsg !== "" ? (
                <Typography
                  sx={{ color: "red", fontSize: "11px", textAlign: "center" }}
                >
                  {numErrorMsg}
                </Typography>
              ) : (
                <Box p={1} />
              )}
              <Box p={0.8} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => sendOtptoPhone()}
                sx={{ fontWeight: "bold", textTransform: "none" }}
                disabled={isOtpsentLoading}
              >
                {isOtpsentLoading ? (
                  <Box sx={dotContainerStyle}>
                    <Box sx={{ ...dotStyle, animationDelay: "0s" }}></Box>
                    <Box sx={{ ...dotStyle, animationDelay: "0.2s" }}></Box>
                    <Box sx={{ ...dotStyle, animationDelay: "0.4s" }}></Box>
                    <Box sx={{ ...dotStyle, animationDelay: "0.6s" }}></Box>
                    <Box sx={{ ...dotStyle, animationDelay: "0.8s" }}></Box>
                  </Box>
                ) : (
                  "Send OTP"
                )}
              </Button>

              <Box p={0.8} />

              <CustomButton
                title="Login with Gmail"
                loading={isOtpsentLoading}
                onPressed={handleGoogleSignIn}
                fullWidth
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  fontSize: { sm: 15, xs: 12 },
                  px: { xs: 0 },
                  py: { xs: 0 },
                  textTransform: "none",
                }}
                hoverColor="#1fd4af"
                hoverTxtColor="white"
                startIcon={
                  <Box
                    component="img"
                    alt="Tapxtream Gmail Login"
                    src={gicon}
                    sx={{ width: 32 }}
                  />
                }
              />
            </Box>
          ) : (
            <Box sx={{ width: { md: "60%" } }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  component="img"
                  alt="otp page"
                  src={otpimgSent}
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
                  fontSize: { xs: "1.5rem", md: "2.2rem" },
                  fontWeight: "bold",
                  textAlign: "center",
                  color: { md: "white" },
                }}
              >
                Login OTP Verification !
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ textAlign: "center", color: { md: "white" } }}
              >
                Enter the OTP sent to
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: { md: "white" },
                }}
              >
                {countryCode} {phoneNumber}
              </Typography>
              <Box p={2} />
              <Box sx={{ width: "100%" }}>
                <PinInput
                  length={6}
                  type="numeric"
                  inputMode="number"
                  onComplete={(value) => {
                    setOtpEntered(value);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  inputStyle={{
                    borderColor: "#2C2D3C",
                    borderRadius: "6px",
                    fontSize: 18,
                    color: isMdScreen ? "white" : "black",
                  }}
                />
              </Box>

              <Box p={0.5} />
              {otpErrorMsg !== "" ? (
                <Typography
                  sx={{ color: "red", fontSize: "12px", textAlign: "center" }}
                >
                  {otpErrorMsg}
                </Typography>
              ) : (
                <Box p={1.1} />
              )}
              <Box p={0.8} />
              {isActive ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    justifyContent: "space-between",
                    pl: 2,
                    pr: 2,
                  }}
                >
                  <Typography sx={{ color: { xs: "black", md: "white" } }}>
                    Didn’t receive the OTP?
                  </Typography>
                  <Link
                    onClick={(e) => handleResend(e)}
                    sx={{
                      color: { xs: "#1976d2", md: "white" },
                      cursor: "pointer",
                      textDecoration: { xs: "none", md: "underline" },
                      fontWeight: "Bold",
                    }}
                  >
                    Resend OTP
                  </Link>
                </Box>
              ) : (
                <Typography
                  sx={{
                    color: { xs: "blue", md: "white" },
                    textAlign: "center",
                  }}
                >
                  Resend OTP in {timer}s
                </Typography>
              )}
              <Box p={0.5} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleSubmit()}
                sx={{ fontWeight: "bold" }}
                disabled={isConfirmOtpLoading}
              >
                {isConfirmOtpLoading ? (
                  <Box sx={dotContainerStyle}>
                    <Box sx={{ ...dotStyle, animationDelay: "0s" }}></Box>
                    <Box sx={{ ...dotStyle, animationDelay: "0.2s" }}></Box>
                    <Box sx={{ ...dotStyle, animationDelay: "0.4s" }}></Box>
                    <Box sx={{ ...dotStyle, animationDelay: "0.6s" }}></Box>
                    <Box sx={{ ...dotStyle, animationDelay: "0.8s" }}></Box>
                  </Box>
                ) : (
                  "Confirm OTP & Login"
                )}
              </Button>
            </Box>
          )}

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 2,
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              color: { xs: "grey", md: "white" },
            }}
          >
            Didn’t have an Account?{" "}
            <Link
              href="/register-now"
              disabled={isOtpsentLoading}
              sx={{
                textDecoration: { xs: "none", md: "underline" },
                color: { md: "white" },
                fontWeight: "bold",
              }}
            >
              Signup
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailLoginPage;
