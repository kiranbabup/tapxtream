import React, { useEffect, useState, useCallback, useRef } from "react";
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
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import tapxcompanyLogo from "../../data/images/tapxtream.png";

const NFCDesignPricing = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const swiperRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user"));

    const onSubmitPrem = async (data) => {
        setLoading(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            const updatedData = {
                cardType: "Premium NFC Card",
                cardPrice: "599",
                selectedServiceID: 7,
                updateProfileCount: 5,
                updateSocialCount: 5,
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
                cardPrice: "1",
                selectedServiceID: 8,
                updateProfileCount: 3,
                updateSocialCount: 3,
            };
            await updateDoc(userDocRef, updatedData);
            navigate("/nfc-display");
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    // const onSubmitBack = () => {
    //     setLoading(true);
    //     navigate(-1);
    //     setLoading(false); // Optional: Reset loading after navigation
    // };

    return (
        <Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", position: "relative" }}>
            <Box component="img"
                alt="Company Logo"
                src={tapxcompanyLogo}
                sx={{
                    width: "65px",
                    position: "absolute",
                    top: 2,
                    left: 2,
                    zIndex: 5,
                    // backgroundColor: "white",
                    borderRadius: "6px"
                }}
            />
            {/* <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            > */}

                {/* Card 1 */}
                {/* <SwiperSlide>
                    <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

                        <Typography sx={{ color: "blue", fontWeight: 600, fontSize: "1.5rem", mt: 1.5 }}>Basic Card</Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: "center",
                                justifyContent:"center",
                                height: "100%",
                                width: { xs: "90%", md: "100%" },
                            }}
                        >
                            <Box sx={{
                                width: { xs: "100%", md: "50%" },
                                height: { md: "100%" },
                                display: "flex", justifyContent: "center", alignItems: "center",
                            }}>
                                <Box
                                    component="img"
                                    alt="NFC Card Model White"
                                    src={NFCCardModelW}
                                    sx={{
                                        width: { xs: "80%", md: "60%" },
                                    }}
                                />
                            </Box>

                            <Box sx={{
                                width: { xs: "100%", md: "45%" },
                                height: { md: "100%" },
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: { md: "center" },
                                alignItems: { xs: "center", md: "start" },
                            }}>
                                <Typography sx={{
                                    color: "blue", fontWeight: 600, fontSize: "1.5rem",
                                    // display:{xs:"none", md:"block"}
                                }}>Buy for Just</Typography>

                                <Typography sx={{ color: "blue", fontWeight: 600, fontSize: "1.5rem" }}>
                                    ₹299.00 <del style={{ color: "red", fontWeight: "lighter" }}>₹799.00</del>
                                </Typography>

                                <Box sx={{ border: "2px solid blue", width: { xs: "90%", md: "95%" }, p: 1, mb: 2, mt: 1 }}>
                                    <Typography sx={{ color: "blue", fontWeight: 600, fontSize: "1.2rem", textAlign: "start", pl: 1 }}>
                                        Specifications:
                                    </Typography>
                                    <ul style={{ color: "blue", paddingLeft: "15px" }}>
                                        <li>Profile Updates - Upto 3 Times</li>
                                        <li>Unlimited Profile Sharing</li>
                                        <li>No more typing in numbers or searching for you on social media.</li>
                                    </ul>
                                </Box>

                                <Box sx={{ display: "flex", 
                                    flexDirection:{md:"row", xs:"column"},
                                    justifyContent: {md:"space-between",}, 
                                    alignItems: "center", width: "100%", gap: "1rem" }}> */}
                                    {/* <Button
                                    variant="outlined"
                                    color="error"
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
                                        "back"
                                    )}
                                </Button> */}

                                    {/* <Button
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
                                            "Buy Basic Card"
                                        )}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => swiperRef.current.slideNext()}
                                        endIcon={<EastIcon />}
                                        sx={{
                                            color: "white",
                                        }}
                                    >
                                        Slide to Premium
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </SwiperSlide> */}

                {/* Card 2 */}
                {/* <SwiperSlide> */}
                    <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#577fd8d9", }}>

                    <Typography sx={{ color: "white", fontWeight: 600, fontSize: "1.5rem", mt: 1.5, display:{xs:"none", md:"block"}}}>Premium Card</Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: "center",
                                justifyContent:"center",
                                height: "100%",
                                width: { xs: "90%", md: "100%" },
                            }}
                        >
                            <Typography sx={{ color: "white", fontWeight: 600, fontSize: "1.5rem", mt: 1.5, display:{xs:"block", md:"none"}}}>Premium Card</Typography>
                            <Box sx={{
                                width: { xs: "100%", md: "50%" },
                                height: { md: "100%" },
                                display: "flex", justifyContent: "center", alignItems: "center",
                            }}>
                                <Box
                                    component="img"
                                    alt="NFC Card Model Black Gold"
                                    src={NFCCardModelBG}
                                    sx={{
                                        width: { xs: "80%", md: "60%" },
                                    }}
                                />
                            </Box>

                            <Box sx={{
                                width: { xs: "100%", md: "45%" },
                                height: { md: "100%" },
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: { md: "center" },
                                alignItems: { xs: "center", md: "start" },
                            }}>
                                <Typography sx={{
                                    color: "white", fontWeight: 600, fontSize: "1.5rem",
                                }}>Buy for Just</Typography>

                                <Typography sx={{ color: "white", fontWeight: 600, fontSize: "1.5rem" }}>
                                    ₹599.00 <del style={{ color: "red", fontWeight: "lighter" }}>₹999.00</del>
                                </Typography>

                                <Box sx={{ border: "2px solid white", width: { xs: "90%", md: "95%" }, p: 1, mb: 2, mt: 1 }}>
                                    <Typography sx={{ color: "white", fontWeight: 600, fontSize: "1.2rem", textAlign: "start", pl: 1 }}>
                                        Specifications:
                                    </Typography>
                                    <ul style={{ color: "white", paddingLeft: "15px" }}>
                                        <li>Profile Updates - Upto 5 Times</li>
                                        <li>Unlimited Profile Sharing</li>
                                        <li>No more typing in numbers or searching for you on social media.</li>
                                    </ul>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection:{md:"row", xs:"column-reverse"},
                                    justifyContent: {md:"space-between",}, alignItems: "center", width: "100%", gap: "1rem" }}>
                                    {/* <Button
                                    variant="outlined"
                                    color="error"
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
                                        "back"
                                    )}
                                </Button> */}
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => swiperRef.current.slidePrev()}
                                        startIcon={<KeyboardBackspaceIcon />}
                                        sx={{
                                            color: "white",
                                        }}
                                    >
                                        Slide to basic
                                    </Button> */}
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
                                            "Buy Premium Card"
                                        )}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                {/* </SwiperSlide> */}
            {/* </Swiper> */}
        </Box>
    );
};

export default NFCDesignPricing;