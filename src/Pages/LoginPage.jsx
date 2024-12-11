import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Link, InputBase } from "@mui/material";
import { collection, addDoc, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import companyLogo from "../data/Inv_logo-Horizontal.png";
import sendOtpimg from "../data/login.png";
// import sendOtpimg from "../data/paper-airplane.png";
import otpimgSent from "../data/OTP.png";
import "./phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../data/styles";

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [saveOtp, setSaveOtp] = useState("");
    const [isOtpsent, setIsOtpsent] = useState(false);
    const [timer, setTimer] = useState(120);
    // const [timer, setTimer] = useState(20);
    const [isActive, setIsActive] = useState(false);
    const [isOtpsentLoading, setIsOtpsentLoading] = useState(false);
    const [numErrorMsg, setNumErrorMsg] = useState("");
    const [otpEntered, setOtpEntered] = useState(["", "", "", "", "", ""]);
    const [otpErrorMsg, setOtpErrorMsg] = useState("");
    const [isConfirmOtpLoading, setIsConfirmOtpLoading] = useState(false);
    const navigate = useNavigate();

    const user = localStorage.getItem("user");

    useEffect(() => {
        if (user) {
            navigate("/update-profile");
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

    const onTypingOTPChange = (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) { // Only allow a single digit
            const newOtp = [...otpEntered];
            newOtp[index] = value;
            setOtpErrorMsg("");
            setOtpEntered(newOtp);

            // Move to the next input if value is entered
            if (value && index < otpEntered.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otpEntered];
            if (!otpEntered[index] && index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
            newOtp[index] = "";
            setOtpErrorMsg("");
            setOtpEntered(newOtp);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
        const newOtp = [...otpEntered];
        pastedData.forEach((digit, idx) => {
            if (idx < newOtp.length && /^\d$/.test(digit)) {
                newOtp[idx] = digit;
            }
        });
        setOtpErrorMsg("");
        setOtpEntered(newOtp);
    };

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
            const otpsending = createOTP();
            setSaveOtp(otpsending);

            const sendValue = {
                mobile: Number(phoneNumber),
                username: "User, Welcome to INV Technologies",
                otp: otpsending,
            }
            // console.log(sendValue);

            try {
                const resendResponse = await fetch('https://apiroute.vibepattern.com/send-sms', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...sendValue }),
                });

                if (!resendResponse.ok) {
                    const errorData = await resendResponse.json();
                    console.error("Error response:", errorData);
                    setNumErrorMsg("Failed to Send OTP. Please Try Again!");
                    throw new Error('Failed to send OTP');
                } else {
                    const messageData = await resendResponse.json();
                    // console.log(messageData);
                    setIsOtpsent(true);
                }
            } catch (error) {
                console.error("Error sending OTP:", error.message);
                alert(`Error: ${error.message}`);
            } finally {
                setIsOtpsentLoading(false);

            }
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
        // Combine array into a single string
        const otpString = otpEntered.join("");

        if (otpString.length < 6) {
            setOtpErrorMsg("Enter a valid 6-digit OTP.");
        } else {
            setIsConfirmOtpLoading(true);

            // Compare the joined string
            if (saveOtp === otpString) {
                try {
                    const q = query(collection(db, "users"), where("mobileNumber", "==", phoneNumber));
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        // const userDocRef = doc(collection(db, "users"));
                        // const uid = userDocRef.id;
                        // await setDoc(userDocRef, {
                        //     mobileNumber: phoneNumber,
                        //     uid: uid,
                        //     createdAt: Date.now(),
                        // });

                        // setIsConfirmOtpLoading(false);

                        // localStorage.setItem("user", JSON.stringify({
                        //     mobileNumber: phoneNumber,
                        //     email: "",
                        //     uid: uid,
                        // }));
                        // navigate("/update-profile");

                        setOtpErrorMsg("Please Register to continue");
                    } else {
                        // console.log("Phone number already exists in the database.");
                        // setOtpErrorMsg("Phone number already registered.");
                        // setIsConfirmOtpLoading(false);

                        // const userDoc = querySnapshot.docs[0]; // Get the first matching document
                        // const userData = userDoc.data();
    
                        localStorage.setItem("user", JSON.stringify({
                            mobileNumber: phoneNumber,
                            email: querySnapshot.docs[0].data().email || "",
                            uid: querySnapshot.docs[0].id,
                        }));
                        navigate("/update-profile");
                    }
                } catch (error) {
                    console.error("Error verifying OTP or storing phone number:", error);
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
            // backgroundColor:"black",
            // color:"white"
        }}>
            {/* <HeaderComponent /> */}
            {/* <Box
                sx={{ height: "10vh" }}
            ></Box> */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "center",
                    height: "100vh",
                    // height: { md: "calc(100vh - 10vh)" },
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "60%" },
                        // backgroundColor: "#3f51b5",
                        display: { xs: "none", md: "block" },
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Box component="img"
                            alt="Company Logo"
                            src={companyLogo}
                            sx={{
                                width: "500px",
                                ml: 2,
                                cursor: "pointer",
                            }}
                            onClick={() => navigate('/')}
                        />
                    </Box>
                    {/* Add your background image or design here */}
                </Box>

                <Box
                    sx={{
                        width: { md: "40%" },
                        p: { xs: 2, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    {
                        !isOtpsent ?
                            (
                                <Box>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Box component="img"
                                            alt="otp page"
                                            src={sendOtpimg}
                                            sx={{
                                                width: "150px",
                                                // ml: 2,
                                                cursor: "pointer",
                                            }}
                                            onClick={() => navigate('/')}
                                        />
                                    </Box>
                                    <Typography
                                        gutterBottom
                                        sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" }, fontWeight: "bold", textAlign: "center" }}
                                    >
                                        Login Now !
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                        sx={{ fontSize: { xs: "0.875rem", md: "1rem" }, textAlign: "center", color: "gray" }}
                                    >
                                        We will send you an One Time Password(OTP) to the given Phone Number.
                                    </Typography>
                                    <Box p={4} />
                                    <Typography
                                        sx={{ textAlign: "center", color: "gray", width: "100%" }}
                                    >Enter Phone Number</Typography>
                                    <Box p={0.5} />

                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        required
                                        placeholder="Enter 10 digits Phone number"
                                        value={phoneNumber}
                                        inputProps={{
                                            maxLength: 10,
                                            inputMode: "numeric",
                                            style: { textAlign: "center" }
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
                                    <Box p={0.5} />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => sendOtptoPhone()}
                                        sx={{ mt: 2, fontSize: { xs: "0.875rem", md: "1rem" }, }}
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
                                <Box>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Box component="img"
                                            alt="otp page"
                                            src={otpimgSent}
                                            sx={{
                                                width: "150px",
                                                // ml: 2,
                                                cursor: "pointer",
                                            }}
                                            onClick={() => navigate('/')}
                                        />
                                    </Box>
                                    <Typography
                                        gutterBottom
                                        sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" }, fontWeight: "bold", textAlign: "center" }}
                                    >
                                        Login OTP Verification !
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                        sx={{ fontSize: { xs: "0.875rem", md: "1rem" }, textAlign: "center", color: "gray" }}
                                    >
                                        Enter the OTP sent to
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                        sx={{ textAlign: "center", fontWeight: "bold" }}
                                    >
                                        +91 {phoneNumber}
                                    </Typography>
                                    <Box p={2} />

                                    <Box display="flex" gap={1} justifyContent="center">
                                        {otpEntered.map((digit, index) => (
                                            <InputBase
                                                key={index}
                                                id={`otp-input-${index}`}
                                                value={digit}
                                                inputProps={{
                                                    maxLength: 1,
                                                    style: {
                                                        textAlign: "center",
                                                        width: "40px",
                                                        height: "40px",
                                                        fontSize: "18px",
                                                        border: "none",
                                                        borderBottom: `2px solid ${digit ? "black" : "gray"}`
                                                    }
                                                }}
                                                onChange={(e) => onTypingOTPChange(e, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                onPaste={handlePaste}
                                            />
                                        ))}
                                    </Box>

                                    <Box p={0.5} />
                                    {
                                        otpErrorMsg !== "" ?
                                            <Typography sx={{ color: "red", fontSize: "12px", textAlign: "center" }}>{otpErrorMsg}</Typography>
                                            : <Box p={1.1} />
                                    }
                                    <Box p={0.5} />
                                    {
                                        isActive ? (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "space-between", pl: 2, pr: 2 }}>
                                                <Typography sx={{ color: "grey" }}>Didn’t receive the OTP?</Typography>
                                                <Link onClick={(e) => handleResend(e)} style={{ color: "#1976d2", textDecoration: "none", fontWeight: "Bold" }}>
                                                    Resend OTP
                                                </Link>
                                            </Box>
                                        ) : (
                                            <Typography style={{ color: "blue", textAlign: "center" }}>Resend OTP in {timer}s</Typography>
                                        )
                                    }
                                    {/* <Typography style={{ color: "#CED765" }}>Resend OTP in {timer}s</Typography> */}
                                    <Box p={0.5} />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => handleSubmit()}
                                        sx={{ fontSize: { xs: "0.875rem", md: "1rem" }, }}
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
                                    {/* </Box> */}
                                </Box>
                            )}


                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 2, fontSize: { xs: "0.75rem", md: "0.875rem" }, color:"grey" }}
                    >
                        Didn’t have an Account? <Link href="/register-now" style={{textDecoration:"none"}}>Signup</Link>.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;