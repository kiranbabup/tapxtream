import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, TextField, Typography, Grid, } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import "../phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../../data/styles";
import NFCCardModelBG from "../../data/images/nfc-card_type1_blackGold.png";
import NFCCardModelW from "../../data/images/nfc-card_type2_White.png";

const NFCDesignPricing = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const onSubmitPrem = async (data) => {
        setLoading(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            const updatedData = {
                cardType: "Premium NFC Card",
                cardPrice: "599",
                selectedServiceID:7,
            };
            await updateDoc(userDocRef, updatedData);
            navigate("/nfc-display");
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmitBasic = async (data) => {
        // console.log("basic");

        setLoading(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            const updatedData = {
                cardType: "Basic NFC Card",
                cardPrice: "299",
                selectedServiceID:8,
            };
            await updateDoc(userDocRef, updatedData);
            navigate("/nfc-display");
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmitBack = () => {
        setLoading(true);
        navigate(-1);
        setLoading(false); // Optional: Reset loading after navigation
    };

    return (
        <Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", }}>
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={1}
            >
                {/* Card 1 */}
                <SwiperSlide>
                    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#577fd8d9", }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                width: { xs: "90%", md: "450px" },
                            }}
                        >
                            <Typography sx={{ color: "white", fontWeight: 600, fontSize: "1.5rem" }}>Premium Card</Typography>
                            <Box
                                component="img"
                                alt="NFC Card Model Black Gold"
                                src={NFCCardModelBG}
                                sx={{
                                    width: { xs: "85%", md: "80%" },
                                }}
                            />
                            <Typography sx={{ color: "white", fontWeight: 600, fontSize: "1.5rem" }}>
                                ₹599.00 <del style={{ color: "red", fontWeight: "lighter" }}>₹999.00</del>
                            </Typography>
                            <Box sx={{ border: "2px solid white", width: "90%", p: 1, mb: 2, mt: 1 }}>
                                <Typography sx={{ color: "white", fontWeight: 600, fontSize: "1.2rem", textAlign: "start", pl: 1 }}>
                                    Specifications:
                                </Typography>
                                <ul style={{ color: "white", paddingLeft: "15px" }}>
                                    <li>Profile Updates - Upto 5 Times</li>
                                    <li>Unlimited Profile Sharing</li>
                                    <li>No more typing in numbers or searching for you on social media.</li>
                                </ul>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "1rem" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // fullWidth
                                    onClick={() => onSubmitBack()}
                                    sx={{ fontWeight: "bold" }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Box sx={{ ...dotContainerStyle }}>
                                            <Box sx={{ ...dotStyle, animationDelay: '0s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.2s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.4s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.6s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.8s' }}></Box>
                                        </Box>
                                    ) : (
                                        "Back"
                                    )}
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => onSubmitPrem()}
                                    sx={{ fontWeight: "bold" }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Box sx={{ ...dotContainerStyle }}>
                                            <Box sx={{ ...dotStyle, animationDelay: '0s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.2s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.4s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.6s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.8s' }}></Box>
                                        </Box>
                                    ) : (
                                        "Select Premium Card"
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </SwiperSlide>

                {/* Card 2 */}
                <SwiperSlide>
                    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                height: "100%",
                                justifyContent: "center",
                                width: { xs: "90%", md: "450px" },
                            }}
                        >
                            <Typography sx={{ color: "blue", fontWeight: 600, fontSize: "1.5rem" }}>Basic Card</Typography>
                            <Box
                                component="img"
                                alt="NFC Card Model White"
                                src={NFCCardModelW}
                                sx={{
                                    width: { xs: "85%", md: "80%" },
                                }}
                            />
                            <Typography sx={{ color: "blue", fontWeight: 600, fontSize: "1.5rem" }}>
                                ₹299.00 <del style={{ color: "red", fontWeight: "lighter" }}>₹799.00</del>
                            </Typography>
                            <Box sx={{ border: "2px solid blue", width: "90%", p: 1, mb: 2, mt: 1 }}>
                                <Typography sx={{ color: "blue", fontWeight: 600, fontSize: "1.2rem", textAlign: "start", pl: 1 }}>
                                    Specifications:
                                </Typography>
                                <ul style={{ color: "blue", paddingLeft: "15px" }}>
                                    <li>Profile Updates - Upto 3 Times</li>
                                    <li>Unlimited Profile Sharing</li>
                                    <li>No more typing in numbers or searching for you on social media.</li>
                                </ul>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "1rem" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // fullWidth
                                    onClick={() => onSubmitBack()}
                                    sx={{ fontWeight: "bold" }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Box sx={{ ...dotContainerStyle }}>
                                            <Box sx={{ ...dotStyle, animationDelay: '0s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.2s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.4s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.6s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.8s' }}></Box>
                                        </Box>
                                    ) : (
                                        "Back"
                                    )}
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => onSubmitBasic()}
                                    sx={{ fontWeight: "bold" }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Box sx={{ ...dotContainerStyle }}>
                                            <Box sx={{ ...dotStyle, animationDelay: '0s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.2s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.4s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.6s' }}></Box>
                                            <Box sx={{ ...dotStyle, animationDelay: '0.8s' }}></Box>
                                        </Box>
                                    ) : (
                                        "Select Basic Card"
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </SwiperSlide>
            </Swiper>
        </Box>
    );
};

export default NFCDesignPricing;