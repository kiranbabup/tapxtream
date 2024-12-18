import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Grid, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import "../phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../../data/styles";
import CreatingTextField from "../../components/CreatingTextField";
import tapxcompanyLogo from "../../data/images/tapxtream.png";
import UserHeaderComponent from "../../components/mainComponents/UserHeaderComponent";

const UpdatePersonalDetails = () => {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

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
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onSubmit = async (data) => {
        if (firstName.length < 4) {
            setErrorMsg("First Name must have at least 4 letters.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMsg("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            const updatedData = {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                email: email,
            };
            await updateDoc(userDocRef, updatedData);
            navigate("/user-profile");
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: "100vw", height: "100vh", }}>
            <UserHeaderComponent />
            <Box sx={{ height: "10vh" }} ></Box>
            <Box sx={{ height: "calc(100vh - 10vh)", width: "100%", display: "flex" }} >
                <Box sx={{ width: "50%", height: "100%", display:{xs:"none", md:"block"} }}>
                    {/* left */}
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Box component="img"
                            alt="Company Logo"
                            src={tapxcompanyLogo}
                            sx={{
                                width: "250px",
                            }}
                        />
                    </Box>
                </Box>
                {/* right */}
                <Box
                    sx={{
                        width: { xs: "100%", md: "50%" },
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:{md:"#577fd8d9"}
                    }}
                >
                    <Box sx={{
                        width: {xs:"90%", md:"60%"},
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        {/* {user.mobileNumber && <Typography sx={{ mb: 2, }} >
                            {user.mobileNumber}
                        </Typography>
                        } */}
                        <Typography
                            sx={{
                                fontSize: "1.3rem",
                                fontWeight: "bold",
                                color:{md: "white"},
                                mb:1
                            }}>
                            Update Personal Details
                        </Typography>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit();
                            }}

                            style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                            <Grid container spacing={2} >
                                <Grid item xs={12}>
                                    <CreatingTextField Icon={AccountCircleRoundedIcon} value={firstName} setValue={setFirstName} placeholder="Enter First Name*" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={AccountCircleRoundedIcon} value={middleName} setValue={setMiddleName} placeholder="Enter Middle Name" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={AccountCircleRoundedIcon} value={lastName} setValue={setLastName} placeholder="Enter Last Name" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={EmailRoundedIcon} value={email} setValue={setEmail} placeholder="Enter Email*" />
                                </Grid>
                                <Grid item xs={12} >{
                                    errorMsg !== "" ?
                                        <Typography sx={{ color: "red", fontSize: "11px", textAlign: "center" }}>{errorMsg}</Typography>
                                        : <Box p={1} />
                                }</Grid>
                                <Grid
                                    item
                                    xs={12}
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
                                                <Box sx={{ ...dotStyle, animationDelay: '0s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.2s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.4s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.6s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.8s' }}></Box>
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
                </Box>
            </Box>
        </Box>
    );
};

export default UpdatePersonalDetails;