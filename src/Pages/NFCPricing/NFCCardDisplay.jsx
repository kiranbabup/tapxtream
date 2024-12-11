import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Grid, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import "../phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../../data/styles";
import SymbolBlack from "../../data/images/nfcrelated/NFC-Symbol-black.png";
import SymbolGold from "../../data/images/nfcrelated/NFC-Symbol-gold.png";
import QRGold from "../../data/images/nfcrelated/QR-gold.png";
import QRBlack from "../../data/images/nfcrelated/QR-black.png";
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const NFCCardDisplay = () => {
    const [cardData, setCardData] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [loadingSuccess, setLoadingSuccess] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchUserData = async () => {
        if (user) {
            const userDoc = doc(db, "users", user.uid);
            const userData = await getDoc(userDoc);

            if (userData.exists()) {
                const data = userData.data();
                // console.log(data);
                setCardData(data);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(()=>{
        if(cardData.paymentStatus === "Successful"){
            navigate('/update-profile');
        }
    },[cardData])
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch('https://apiroute.vibepattern.com/create_payment_service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_name": cardData.firstName,
                    "email": cardData.email,
                    "phone_no": cardData.mobileNumber,
                    "product_id": cardData.selectedServiceID,
                    "payment_status": "Pending",
                    "amount": Number(cardData.cardPrice),
                    "plan_months": 120,
                    "service_name": cardData.cardType,
                }),
            });
            const result = await response.json();
            const userDocRef = doc(db, "users", user.uid);

            if (response.ok) {
                // console.log(result);
                const updatedData = {
                    payment_genarate_id: result.genarate_id,
                    paymentStatus: "Pending",
                };
                await updateDoc(userDocRef, updatedData);
                const goto = `https://payments.invtechnologies.in/paynow/${result.genarate_id}`
                window.location.href = goto;
                // window.open(goto, '_blank');
                // setErrorMsg("Payment Link generated Successfully");
                handleOpen();
            } else if (result.error && result.existingPaymentService) {
                console.warn("Email and service_name already exist:", result.error);
                console.warn("Email and service_name already exist:", result.existingPaymentService);
                const existingId = result.existingPaymentService.genarate_id;
                const updatedData = {
                    payment_genarate_id: existingId,
                    paymentStatus: "Pending",
                };
                await updateDoc(userDocRef, updatedData);
                const goto = `https://payments.invtechnologies.in/paynow/${existingId}`;
                // window.open(goto, '_blank');
                window.location.href = goto;
                // setErrorMsg("Payment link retrieved from existing service.");
                handleOpen();
            } else {
                // Handle other errors
                console.error("Failed to generate payment link:", result.error || "Unknown error");
                // setErrorMsg("Failed to generate payment link.");
            }
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

    const updatePaymentStatusInFirebase = async (newStatus) => {
        if (user) {
            const userDoc = doc(db, "users", user.uid);
            await updateDoc(userDoc, {
                paymentStatus: newStatus,
            });
            // console.log(newStatus);
        }
    };

    const onSubmitPaymentSuccess = async () => {
        setLoadingSuccess(true);

        try {
            // Fetch user data
            await fetchUserData();

            if (cardData.paymentStatus === "Pending") {
                // Call the API to check payment status
                const response = await fetch(
                    `https://apiroute.vibepattern.com/get_payment_service_by_id/${cardData.payment_genarate_id}`
                );

                if (response.ok) {
                    const paymentData = await response.json();
                    // console.log(paymentData);

                    if (paymentData.payment_status === "Pending") {
                        handleClose();
                    } else if (paymentData.payment_status === "Successful") {
                        await updatePaymentStatusInFirebase("Successful");
                        navigate("/update-profile");
                    }
                } else {
                    console.error("Failed to fetch payment data from API");
                }
            } else if (cardData.paymentStatus === "Successful") {
                // If already successful, navigate directly
                navigate("/update-profile");
            }
        } catch (error) {
            console.error("Error during payment status check:", error);
        } finally {
            setLoadingSuccess(false);
        }
    };

    return (
        <Box sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box
                sx={{
                    width: { xs: "90%", md: "450px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem"
                }}
            >
                <Typography sx={{ color: "blue", fontWeight: 600, fontSize: "1.5rem" }}>Your Card Looks Like this</Typography>

                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title">
                            Please Select To Move Further
                        </Typography>
                        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography> */}
                        <Box id="modal-modal-description" sx={{ mt: 2, display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => onSubmitPaymentSuccess()}
                                sx={{ fontWeight: "bold" }}
                                disabled={loadingSuccess}
                            >
                                {loadingSuccess ? (
                                    <Box sx={{ ...dotContainerStyle }}>
                                        <Box sx={{ ...dotStyle, animationDelay: '0s' }}></Box>
                                        <Box sx={{ ...dotStyle, animationDelay: '0.2s' }}></Box>
                                        <Box sx={{ ...dotStyle, animationDelay: '0.4s' }}></Box>
                                        <Box sx={{ ...dotStyle, animationDelay: '0.6s' }}></Box>
                                        <Box sx={{ ...dotStyle, animationDelay: '0.8s' }}></Box>
                                    </Box>
                                ) : (
                                    "Payment Successful"
                                )}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => handleClose()}
                                sx={{ fontWeight: "bold" }}
                            >
                                Not Paid
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    navigate('/login');
                                }}
                                sx={{ fontWeight: "bold" }}
                            >
                                Go to Login
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    navigate('/');
                                }}
                                sx={{ fontWeight: "bold" }}
                            >
                                Go to Home
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                {
                    cardData.cardType === "Premium NFC Card" &&
                    <>
                        <Box
                            sx={{
                                width: { xs: "90%", md: "350px" },
                                height: "12rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                backgroundColor: "black",
                                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                borderRadius: "12px"
                            }}
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, color: "#d4af37" }}>
                                <Box>
                                    <Typography sx={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: "bold" }}><CallIcon fontSize="small" /> +91 {cardData.mobileNumber} </Typography>
                                    <Typography sx={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: "bold" }}><MailIcon fontSize="small" /> {cardData.email} </Typography>
                                </Box>
                                <Box
                                    component="img"
                                    alt="NFC Card symbol gold"
                                    src={SymbolGold}
                                    sx={{
                                        width: { xs: "3rem", md: "3.4rem" },
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end", p: 2, color: "#d4af37" }}>
                                <Box>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{cardData.firstName} {cardData.middleName} {cardData.lastName}</Typography>
                                    {!cardData.designation || cardData.designation === "" ? <Box p={1} /> : <Typography sx={{ fontSize: "12px" }}>{cardData.designation}</Typography>}

                                </Box>
                                <Box
                                    component="img"
                                    alt="NFC Card QR gold"
                                    src={QRGold}
                                    sx={{
                                        width: "4.5rem",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: { xs: "90%", md: "350px" },
                                height: "12rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "black",
                                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                borderRadius: "12px",
                                position: "relative"
                            }}
                        >
                            <Box
                                component="img"
                                alt="NFC Card symbol gold"
                                src={SymbolGold}
                                sx={{
                                    position: "absolute",
                                    top: "20px",
                                    right: "20px",
                                    width: { xs: "2.5rem", md: "2.8rem" },
                                }}
                            />
                            {
                                !cardData.companyLogo || cardData.companyLogo === "null" ?
                                    <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#d4af37" }}>Please Upload Company Logo</Typography>
                                    : <Box
                                        component="img"
                                        alt="Company Logo"
                                        src={cardData.companyLogo}
                                        sx={{
                                            maxWidth: "75%",
                                            // minWidth: "30%",
                                            maxHeight: "50%",
                                        }}
                                    />
                            }
                        </Box>
                        <Typography sx={{ color: "blue", fontWeight: 600, fontSize: "1.5rem" }}>
                            ₹599.00 <del style={{ color: "red", fontWeight: "lighter" }}>₹999.00</del>
                        </Typography>
                    </>
                }

                {
                    cardData.cardType === "Basic NFC Card" &&
                    <>
                        <Box
                            sx={{
                                width: { xs: "90%", md: "350px" },
                                height: "12rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                backgroundColor: "white",
                                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                borderRadius: "12px",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            <Box
                                component="img"
                                alt="NFC Card symbol black"
                                src={SymbolBlack}
                                sx={{
                                    width: "12rem",
                                    position: "absolute",
                                    zIndex: "0",
                                    top: "-70px",
                                    left: "-50px",
                                    opacity: 0.08
                                }}
                            />
                            <Box
                                component="img"
                                alt="NFC Card symbol black"
                                src={SymbolBlack}
                                sx={{
                                    width: "12rem",
                                    position: "absolute",
                                    zIndex: "0",
                                    bottom: "-94px",
                                    left: "-69px",
                                    rotate: "12deg",
                                    opacity: 0.08
                                }}
                            />
                            <Box
                                component="img"
                                alt="NFC Card symbol black"
                                src={SymbolBlack}
                                sx={{
                                    width: "20rem",
                                    position: "absolute",
                                    zIndex: "0",
                                    bottom: "-199px",
                                    right: "-194px",
                                    rotate: "226deg",
                                    opacity: 0.08
                                }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, color: "black", position: "absolute", zIndex: 1, width: "90%" }}>
                                <Box>
                                    <Typography sx={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: "bold" }}><CallIcon fontSize="small" /> +91 {cardData.mobileNumber} </Typography>
                                    <Typography sx={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: "bold" }}><MailIcon fontSize="small" /> {cardData.email} </Typography>
                                </Box>
                                <Box
                                    component="img"
                                    alt="NFC Card symbol black"
                                    src={SymbolBlack}
                                    sx={{
                                        width: { xs: "3rem", md: "3.4rem" },
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end", p: 2, color: "black", position: "absolute", zIndex: "1", bottom: 1, width: "90%" }}>
                                <Box>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{cardData.firstName} {cardData.middleName} {cardData.lastName}</Typography>
                                    {!cardData.designation || cardData.designation === "" ? <Box p={1} /> : <Typography sx={{ fontSize: "12px" }}>{cardData.designation}</Typography>}
                                </Box>
                                <Box
                                    component="img"
                                    alt="NFC Card QR black"
                                    src={QRBlack}
                                    sx={{
                                        width: "4.5rem",
                                        backgroundColor: "white"
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: { xs: "90%", md: "350px" },
                                height: "12rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "white",
                                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                borderRadius: "12px",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            <Box
                                component="img"
                                alt="NFC Card symbol black"
                                src={SymbolBlack}
                                sx={{
                                    width: "12rem",
                                    position: "absolute",
                                    zIndex: "0",
                                    top: "-70px",
                                    left: "-50px",
                                    opacity: 0.08
                                }}
                            />
                            <Box
                                component="img"
                                alt="NFC Card symbol black"
                                src={SymbolBlack}
                                sx={{
                                    width: "12rem",
                                    position: "absolute",
                                    zIndex: "0",
                                    bottom: "-94px",
                                    left: "-69px",
                                    rotate: "12deg",
                                    opacity: 0.08
                                }}
                            />
                            <Box
                                component="img"
                                alt="NFC Card symbol black"
                                src={SymbolBlack}
                                sx={{
                                    width: "20rem",
                                    position: "absolute",
                                    zIndex: "0",
                                    bottom: "-199px",
                                    right: "-194px",
                                    rotate: "226deg",
                                    opacity: 0.08
                                }}
                            />
                            <Box
                                component="img"
                                alt="NFC Card symbol black"
                                src={SymbolBlack}
                                sx={{
                                    width: { xs: "2.5rem", md: "2.8rem" },
                                    position: "absolute",
                                    top: "20px",
                                    right: "20px",
                                    zIndex: 1
                                }}
                            />
                            <Box sx={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                zIndex: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                {
                                    !cardData.companyLogo || cardData.companyLogo === "null" ?
                                        <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "black" }}>Please Upload Company Logo</Typography>
                                        : <Box
                                            component="img"
                                            alt="Company Logo"
                                            src={cardData.companyLogo}
                                            sx={{
                                                maxWidth: "75%",
                                                // minWidth: "30%",
                                                maxHeight: "50%",
                                            }}
                                        />
                                }
                            </Box>
                        </Box>
                        <Typography sx={{ color: "blue", fontWeight: 600, fontSize: "1.5rem" }}>
                            ₹299.00 <del style={{ color: "red", fontWeight: "lighter" }}>₹799.00</del>
                        </Typography>
                    </>
                }
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "1rem" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
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
                        onClick={() => onSubmit()}
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
                            "Buy Now"
                        )}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default NFCCardDisplay;