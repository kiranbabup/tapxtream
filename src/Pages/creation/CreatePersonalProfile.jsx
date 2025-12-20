import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import topVector from "../../data/images/createScreens/VectorTop.svg";
import bottomVector from "../../data/images/createScreens/VectorBottom.svg";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneIcon from "@mui/icons-material/Phone";
import "../phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../../data/styles";
import CreatingTextField from "../../components/CreatingTextField";
import tapxcompanyLogo from "../../data/images/tapxtream.png";

const CreatePersonalProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isPhoneMissing = !user?.mobileNumber;
  const isEmailMissing = !user?.email;

  const fetchUserData = async () => {
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      const userData = await getDoc(userDoc);

      if (userData.exists()) {
        const data = userData.data();

        setFirstName(data.firstName || "");
        setMiddleName(data.middleName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setPhone(data.mobileNumber || "");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  //   const onSubmit = async (data) => {
  //     if (firstName.length < 4) {
  //       setErrorMsg("First Name must have at least 4 letters.");
  //       return;
  //     }

  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailRegex.test(email)) {
  //       setErrorMsg("Please enter a valid email address.");
  //       return;
  //     }

  //     setLoading(true);
  //     try {
  //       const userDocRef = doc(db, "users", user.uid);
  //       const updatedData = {
  //         firstName: firstName,
  //         middleName: middleName,
  //         lastName: lastName,
  //         email: email,
  //       };
  //       await updateDoc(userDocRef, updatedData);
  //       navigate("/company-details");
  //     } catch (error) {
  //       console.error("Error updating profile:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const onSubmit = async () => {
    setErrorMsg("");

    if (firstName.length < 4) {
      setErrorMsg("First Name must have at least 4 letters.");
      return;
    }

    if (!email && !phone) {
      setErrorMsg("Email or Phone is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // 🔍 CHECK EMAIL DUPLICATE
      if (!user.email && email) {
        const emailQuery = query(
          collection(db, "users"),
          where("email", "==", email)
        );
        const emailSnap = await getDocs(emailQuery);

        if (!emailSnap.empty) {
          setErrorMsg("Email already exists.");
          setLoading(false);
          return;
        }
      }

      // 🔍 CHECK PHONE DUPLICATE
      if (!user.mobileNumber && phone) {
        const phoneQuery = query(
          collection(db, "users"),
          where("mobileNumber", "==", phone)
        );
        const phoneSnap = await getDocs(phoneQuery);

        if (!phoneSnap.empty) {
          setErrorMsg("Phone number already exists.");
          setLoading(false);
          return;
        }
      }

      // ✅ UPDATE USER
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        firstName,
        middleName,
        lastName,
        email: email || user.email || "",
        mobileNumber: phone || user.mobileNumber || "",
      });

      // Update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          email: email || user.email,
          mobileNumber: phone || user.mobileNumber,
        })
      );

      navigate("/company-details");
    } catch (error) {
      console.error("Profile update error:", error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Box
        sx={{
          width: { md: "50%" },
          display: { xs: "none", md: "block" },
        }}
      >
        {/* left */}
        <Box
          sx={{
            // width: { xs: "100%", md: "450px" },
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ position: "relative", width: "100%", height: "5rem" }}
          ></Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              alt="Company Logo"
              src={tapxcompanyLogo}
              sx={{
                width: "250px",
                // ml: 2,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
          </Box>

          <Box sx={{ position: "relative", width: "100%", height: "9rem" }}>
            <Box
              component="img"
              alt="bottomVector"
              src={bottomVector}
              sx={{
                width: "150px",
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* right */}
      <Box
        sx={{
          width: { md: "50%" },
          display: "flex",
          justifyContent: "center",
          // backgroundColor: { md: "#577fd8d9" }
        }}
      >
        <Box
          sx={{
            // width: { xs: "100%", md: "450px" },
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: { md: "aliceblue" },
          }}
        >
          <Box sx={{ position: "relative", width: "100%", height: "9rem" }}>
            <Box
              component="img"
              alt="topVector"
              src={topVector}
              sx={{
                width: "250px",
                position: "absolute",
                top: 0,
                right: 0,
              }}
            />
            <Box
              component="img"
              alt="Company Logo"
              src={tapxcompanyLogo}
              sx={{
                width: "65px",
                position: "absolute",
                top: 2,
                left: 2,
                display: { xs: "block", md: "none" },
              }}
            />
            <Typography
              sx={{
                textAlign: "center",
                width: "100%",
                fontSize: "1.5rem",
                fontWeight: 600,
                position: "absolute",
                zIndex: 2,
                bottom: 5,
              }}
            >
              Fill Profile
            </Typography>
          </Box>

          <Box
            sx={{
              width: { xs: "90%", md: "50%" },
              // width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!isEmailMissing && (
              <Typography sx={{ mb: 1 }}>
                Email: <strong>{email}</strong>
              </Typography>
            )}

            {!isPhoneMissing && (
              <Typography sx={{ mb: 1 }}>
                Phone: <strong>{phone}</strong>
              </Typography>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              style={{
                width: "100%",
                maxWidth: "600px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CreatingTextField
                    Icon={AccountCircleRoundedIcon}
                    value={firstName}
                    setValue={setFirstName}
                    placeholder="Enter First Name*"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CreatingTextField
                    Icon={AccountCircleRoundedIcon}
                    value={middleName}
                    setValue={setMiddleName}
                    placeholder="Enter Middle Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CreatingTextField
                    Icon={AccountCircleRoundedIcon}
                    value={lastName}
                    setValue={setLastName}
                    placeholder="Enter Last Name"
                  />
                </Grid>
                {isPhoneMissing && (
                  <Grid item xs={12}>
                    <CreatingTextField
                      Icon={PhoneIcon}
                      value={phone}
                      setValue={setPhone}
                      placeholder="Enter Phone Number*"
                      inputProps={{
                        maxLength: 10,
                        inputMode: "numeric",
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
                  </Grid>
                )}

                {isEmailMissing && (
                  <Grid item xs={12}>
                    <CreatingTextField
                      Icon={EmailRoundedIcon}
                      value={email}
                      setValue={setEmail}
                      placeholder="Enter Email*"
                    />
                  </Grid>
                )}

                {/* <Grid item xs={12}>
                  <CreatingTextField
                    Icon={EmailRoundedIcon}
                    value={email}
                    setValue={setEmail}
                    placeholder="Enter Email*"
                  />
                </Grid> */}
                <Grid item xs={12}>
                  {errorMsg !== "" ? (
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: "11px",
                        textAlign: "center",
                      }}
                    >
                      {errorMsg}
                    </Typography>
                  ) : (
                    <Box p={1} />
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  // sx={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ borderRadius: "20px", fontWeight: "bold" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <Box sx={{ ...dotContainerStyle, borderRadius: "20px" }}>
                        <Box sx={{ ...dotStyle, animationDelay: "0s" }}></Box>
                        <Box sx={{ ...dotStyle, animationDelay: "0.2s" }}></Box>
                        <Box sx={{ ...dotStyle, animationDelay: "0.4s" }}></Box>
                        <Box sx={{ ...dotStyle, animationDelay: "0.6s" }}></Box>
                        <Box sx={{ ...dotStyle, animationDelay: "0.8s" }}></Box>
                      </Box>
                    ) : (
                      "Next"
                    )}
                  </Button>
                </Grid>
              </Grid>
              <Box p={1} />
            </form>
          </Box>

          <Box sx={{ position: "relative", width: "100%", height: "5rem" }}>
            <Box
              component="img"
              alt="bottomVector"
              src={bottomVector}
              sx={{
                width: "150px",
                position: "absolute",
                bottom: 0,
                left: 0,
                display: { xs: "block", md: "none" },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePersonalProfile;
