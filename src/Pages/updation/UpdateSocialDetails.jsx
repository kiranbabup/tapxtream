import React, { useEffect, useState, } from "react";
import { Box, Button, TextField, Typography, Grid, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import "../phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../../data/styles";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CreatingTextField from "../../components/CreatingTextField";
import tapxcompanyLogo from "../../data/images/tapxtream.png";
import UserHeaderComponent from "../../components/mainComponents/UserHeaderComponent";

const UpdateSocialDetails = () => {
    const [facebookUrl, setFacebookUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");
    const [linkedInUrl, setLinkedInUrl] = useState("");
    const [whatsAppNumber, setWhatsAppNumber] = useState("");

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
                setFacebookUrl(data.facebookUrl || "");
                setInstagramUrl(data.instagramUrl || "");
                setTwitterUrl(data.twitterUrl || "");
                setLinkedInUrl(data.linkedInUrl || "");
                setWhatsAppNumber(data.whatsAppNumber || "");
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onTypingChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setErrorMsg("");
            setWhatsAppNumber(value);
        }
    }

    const onSubmit = async (data) => {
        if (facebookUrl.length < 4) {
            setErrorMsg("Please fill the URL'S & Number or click on Skip & Next");
            return;
        }
        if (whatsAppNumber.length < 10) {
            setErrorMsg("Please fill the URL'S & Number or click on Skip & Next");
            return;
        }

        setLoading(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            const updatedData = {
                facebookUrl: facebookUrl,
                instagramUrl: instagramUrl,
                twitterUrl: twitterUrl,
                linkedInUrl: linkedInUrl,
                whatsAppNumber: whatsAppNumber,
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
            <Box sx={{ height: "calc(100vh - 10vh)", width: "100%", display: "flex", }}>
                <Box sx={{ width: "50%", height: "100%", display: { xs: "none", md: "block" } }}>
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
                        <Typography
                            sx={{
                                fontSize: "1.3rem",
                                fontWeight: "bold",
                                color:{md: "white"},
                                mb:1
                            }}>
                            Update Social Details
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
                                    <CreatingTextField Icon={FacebookIcon} value={facebookUrl} setValue={setFacebookUrl} placeholder="Enter Facebook URL" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={InstagramIcon} value={instagramUrl} setValue={setInstagramUrl} placeholder="Enter Instagram URL" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={XIcon} value={twitterUrl} setValue={setTwitterUrl} placeholder="Enter Twitter URL" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={LinkedInIcon} value={linkedInUrl} setValue={setLinkedInUrl} placeholder="Enter LinkedIn URL" />
                                </Grid>
                                <Grid item xs={12} >
                                    <Box sx={{
                                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                        borderRadius: "40px",
                                        width: "100%", height: "3rem",
                                        display: "flex", alignItems: "center", gap: "9px",
                                        backgroundColor:"white"
                                    }}>
                                        <WhatsAppIcon sx={{ color: "#1976d2", ml: "10px" }} />
                                        <TextField
                                            placeholder="Enter Whatsapp Number"
                                            variant="standard"
                                            fullWidth
                                            InputProps={{
                                                disableUnderline: !whatsAppNumber,
                                                maxLength: 10,
                                                inputMode: "numeric",
                                            }}
                                            value={whatsAppNumber}
                                            onChange={(e) => onTypingChange(e)}
                                            onKeyDown={(e) => {
                                                if (e.key === "-" || e.key === "." || e.key === "e" || e.key === "+") {
                                                    e.preventDefault();
                                                }
                                            }}
                                            sx={{
                                                mr: "16px",
                                                "&::before": {
                                                    borderBottom: linkedInUrl
                                                        ? "1px solid rgba(0, 0, 0, 0.42)"
                                                        : "none",
                                                },
                                                "&::after": {
                                                    borderBottom: "2px solid rgba(0, 0, 0, 0.87)",
                                                },
                                            }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} >{
                                    errorMsg !== "" ?
                                        <Typography sx={{ color: "red", fontSize: "11px", textAlign: "center" }}>{errorMsg}</Typography>
                                        : <Box p={1} />
                                }</Grid>
                                
                                <Grid
                                    item
                                    xs={6}
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

export default UpdateSocialDetails;