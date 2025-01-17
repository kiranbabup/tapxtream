import React, { useEffect, useState } from "react";
import { Box, Button, Typography, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, } from "firebase/firestore";
import { db } from "../../services/firebase";
import "../phoneSignup.css";
import SymbolBlack from "../../data/images/nfcrelated/NFC-Symbol-black.png";
import SymbolGold from "../../data/images/nfcrelated/NFC-Symbol-gold.png";
import QRGold from "../../data/images/nfcrelated/QR-gold.png";
import QRBlack from "../../data/images/nfcrelated/QR-black.png";
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import UserHeaderComponent from "../../components/mainComponents/UserHeaderComponent";
import SelectnBuyComp from "../../components/SelectnBuyComp";

const MyNFCCard = () => {
    const [cardData, setCardData] = useState({});

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

    return (
        <Box sx={{
            width: { md: "98.93vw", xs: "100vw" },
        }}>
            <UserHeaderComponent />
            <Box
                sx={{ height: "10vh" }}
            ></Box>
            <Box sx={{ width: "100vw", height: "calc(100vh - 10vh)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box
                    sx={{
                        width: { xs: "90%", md: "450px" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        gap: "1rem"
                    }}
                >
                    <Typography sx={{ color: "blue", fontWeight: 600, fontSize: "1.5rem" }}>My NFC card</Typography>
                    {
                        !cardData.cardType &&
                        <SelectnBuyComp />
                    }
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
                                        <Typography sx={{ display: "flex", alignItems: "start", gap: "5px", fontSize: "13px", fontWeight: "bold", wordBreak: "break-word", overflowWrap: "break-word", }}><MailIcon fontSize="small" /> {cardData.email} </Typography>
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
                                        <Typography sx={{ display: "flex", alignItems: "start", gap: "5px", fontSize: "13px", fontWeight: "bold", wordBreak: "break-word", overflowWrap: "break-word", }}><MailIcon fontSize="small" /> {cardData.email} </Typography>
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
                        </>
                    }
                    {
                        cardData.paymentStatus === "Pending" &&
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                            <Typography sx={{ fontWeight: 600, textAlign: "center" }}>Buy now and Have the Privilege to showcase your profile by a single tap.</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate("/nfc-display")}
                                sx={{ fontWeight: "bold" }}
                            >Buy now</Button>

                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default MyNFCCard;