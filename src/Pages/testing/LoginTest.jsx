import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Link, useMediaQuery, } from "@mui/material";
import { collection, query, where, getDocs, } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import companyLogo from "../../data/images/tapxtream.png";
import sendOtpimg from "../../data/Loginicon.png";
import otpimgSent from "../../data/OTP.png";
import "../phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../../data/styles";
import PinInput from "react-pin-input";

const LoginTest = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [saveOtp, setSaveOtp] = useState("");
    const [isOtpsent, setIsOtpsent] = useState(false);
    const [timer, setTimer] = useState(120);
    const [isActive, setIsActive] = useState(false);
    const [isOtpsentLoading, setIsOtpsentLoading] = useState(false);
    const [numErrorMsg, setNumErrorMsg] = useState("");
    const [otpEntered, setOtpEntered] = useState("");
    const [otpErrorMsg, setOtpErrorMsg] = useState("");
    const [isConfirmOtpLoading, setIsConfirmOtpLoading] = useState(false);

    const navigate = useNavigate();

    const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const user = localStorage.getItem("user");
    useEffect(() => {
        if (user) {
            navigate("/user-profile");
        }
    }, [user, navigate]);

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
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setNumErrorMsg("");
            setPhoneNumber(value);
        }
    }

    function createOTP() {
        const charset = "0123456789";
        let otpPassword = "";
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            otpPassword += charset[randomIndex];
        }
        return otpPassword;
    }

    const sendOtptoPhone = async () => {
        if (phoneNumber.length < 10) {
            setNumErrorMsg("Please Enter Valid 10 Digits Phone Number");
        } else {
            setIsOtpsentLoading(true);
            // added manual mode to be removed when sms live
            setSaveOtp("123456");
            setIsOtpsent(true);
            setIsOtpsentLoading(false);
        }

    };

    const handleResend = (e) => {
        e.preventDefault();
        setIsActive(false);
        setSaveOtp("");
        setOtpEntered("");
        sendOtptoPhone();
        setTimer(120);
    }

    const handleSubmit = async () => {
        if (otpEntered.length < 6) {
            setOtpErrorMsg("Enter a valid 6-digit OTP.");
        } else {
            setIsConfirmOtpLoading(true);
            if (saveOtp === otpEntered) {
                try {
                    const q = query(collection(db, "users"), where("mobileNumber", "==", phoneNumber));
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        setOtpErrorMsg("Please Register to continue");
                    } else {
                        localStorage.setItem("user", JSON.stringify({
                            mobileNumber: phoneNumber,
                            email: querySnapshot.docs[0].data().email || "",
                            uid: querySnapshot.docs[0].id,
                        }));
                        navigate("/user-profile");
                    }
                } catch (error) {
                    // console.error("Error verifying OTP or storing phone number:", error);
                    setOtpErrorMsg("Invalid OTP.");
                } finally {
                    setIsConfirmOtpLoading(false);
                }
            } else {
                setOtpErrorMsg("Enter a valid 6-digit OTP.");
                setIsConfirmOtpLoading(false);
            }
        }
    };

    return (
        <Box sx={{
            height: "100vh",
        }}>
            <Box component="img"
                alt="Company Logo"
                src={companyLogo}
                sx={{
                    width: "65px",
                    cursor: "pointer",
                    display: { md: "none", xs: "block" },
                    pl: 2, paddingTop: "10px"
                }}
                onClick={() => navigate('/')} />

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
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Box component="img"
                            alt="Company Logo"
                            src={companyLogo}
                            sx={{
                                width: "250px",
                                // ml: 2,
                                cursor: "pointer",
                            }}
                            onClick={() => navigate('/')}
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
                        height:"100%",
                        // backgroundColor: { md: "aliceblue" }
                    }}
                >
                    {
                        !isOtpsent ?
                            (
                                <Box sx={{ width: { md: "50%", } }}>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Box component="img"
                                            alt="otp page"
                                            src={sendOtpimg}
                                            sx={{
                                                width: "130px",
                                                height:"140px",
                                                // ml: 2,
                                                cursor: "pointer",
                                            }}
                                            onClick={() => navigate('/')}
                                        />
                                    </Box>
                                    <Typography
                                        gutterBottom
                                        sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" }, fontWeight: "bold", textAlign: "center", color: { md: "white" } }}
                                    >
                                        Login Now !
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                        sx={{ textAlign: "center", color: { md: "white" } }}
                                    >
                                        We will send you an One Time Password(OTP) to the given Phone Number.
                                    </Typography>
                                    <Box p={4} />
                                    <Typography
                                        sx={{ textAlign: "center", width: "100%", fontWeight: "bold", color: { md: "white" } }}
                                    >Enter Phone Number</Typography>
                                    <Box p={0.5} />

                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        required
                                        placeholder="Enter Number"
                                        value={phoneNumber}
                                        inputProps={{
                                            maxLength: 10,
                                            inputMode: "numeric",
                                            style: { textAlign: "center", fontWeight: "bold" },
                                            sx: { color: { md: "white" }, }
                                        }}
                                        onChange={(e) => { onTypingChange(e) }}
                                        onKeyDown={(e) => {
                                            if (e.key === "-" || e.key === "." || e.key === "e" || e.key === "+") {
                                                e.preventDefault();
                                            }
                                        }}

                                    />
                                    <Box p={0.5} />
                                    {
                                        numErrorMsg !== "" ?
                                            <Typography sx={{ color: "red", fontSize: "11px", textAlign: "center" }}>{numErrorMsg}</Typography>
                                            : <Box p={1} />
                                    }
                                    <Box p={0.8} />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => sendOtptoPhone()}
                                        sx={{ fontWeight: "bold" }}
                                        disabled={isOtpsentLoading}
                                    >
                                        {isOtpsentLoading ? (
                                            <Box sx={dotContainerStyle}>
                                                <Box sx={{ ...dotStyle, animationDelay: '0s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.2s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.4s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.6s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.8s' }}></Box>
                                            </Box>
                                        ) : (
                                            "Send OTP"
                                        )}
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ width: { md: "60%", } }} >
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Box component="img"
                                            alt="otp page"
                                            src={otpimgSent}
                                            sx={{
                                                width: "150px",
                                                height:"150px",
                                                // ml: 2,
                                                cursor: "pointer",
                                            }}
                                            onClick={() => navigate('/')}
                                        />
                                    </Box>
                                    <Typography
                                        gutterBottom
                                        sx={{ fontSize: { xs: "1.5rem", md: "2.2rem" }, fontWeight: "bold", textAlign: "center", color: { md: "white" } }}
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
                                        sx={{ textAlign: "center", fontWeight: "bold", color: { md: "white" } }}
                                    >
                                        +91 {phoneNumber}
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
                                            style={{ width: "100%", display: "flex", justifyContent: "space-between", }}
                                            inputStyle={{
                                                borderColor: "#2C2D3C",
                                                borderRadius: "6px",
                                                fontSize: 18,
                                                color: isMdScreen ? "white" : "black",
                                            }}
                                        />
                                    </Box>

                                    <Box p={0.5} />
                                    {
                                        otpErrorMsg !== "" ?
                                            <Typography sx={{ color: "red", fontSize: "12px", textAlign: "center" }}>{otpErrorMsg}</Typography>
                                            : <Box p={1.1} />
                                    }
                                    <Box p={0.8} />
                                    {
                                        isActive ? (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "space-between", pl: 2, pr: 2 }}>
                                                <Typography sx={{ color: { xs: "black", md: "white" } }}>Didn’t receive the OTP?</Typography>
                                                <Link onClick={(e) => handleResend(e)} sx={{ color: { xs: "#1976d2", md: "white", }, cursor: "pointer", textDecoration: { xs: "none", md: "underline" }, fontWeight: "Bold" }}>
                                                    Resend OTP
                                                </Link>
                                            </Box>
                                        ) : (
                                            <Typography sx={{ color: { xs: "blue", md: "white" }, textAlign: "center" }}>Resend OTP in {timer}s</Typography>
                                        )
                                    }
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
                                                <Box sx={{ ...dotStyle, animationDelay: '0s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.2s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.4s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.6s' }}></Box>
                                                <Box sx={{ ...dotStyle, animationDelay: '0.8s' }}></Box>
                                            </Box>
                                        ) : (
                                            "Confirm OTP & Login"
                                        )}
                                    </Button>
                                </Box>
                            )
                    }


                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 2, fontSize: { xs: "0.85rem", md: "0.9rem" }, color: { xs: "grey", md: "white" } }}
                    >
                        Didn’t have an Account? <Link href="/register-now" 
                        sx={{ textDecoration: { xs: "none", md: "underline" }, color: { md: "white" }, fontWeight: "bold" }}
                        >Signup</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginTest;