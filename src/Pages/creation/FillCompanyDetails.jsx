import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography, Grid, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import topVector from "../../data/images/createScreens/VectorTop.svg";
import bottomVector from "../../data/images/createScreens/VectorBottom.svg";
import "../phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../../data/styles";
import CreatingTextField from "../../components/CreatingTextField";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import BusinessIcon from '@mui/icons-material/Business';
import HailIcon from '@mui/icons-material/Hail';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import tapxcompanyLogo from "../../data/images/tapxtream.png";

const FillCompanyDetails = () => {
    const [companyName, setCompanyName] = useState("");
    const [designation, setDesignation] = useState("");
    const [companyLogo, setCompanyLogo] = useState(null);
    const [newCompanyLogo, setNewCompanyLogo] = useState(null);
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
                setCompanyName(data.companyName || "");
                setDesignation(data.designation || "");
                setCompanyLogo(data.companyLogo || null);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const storage = getStorage();
    
    const onDropCompanyLogo = useCallback((acceptedFiles) => {
        setNewCompanyLogo(acceptedFiles[0]);
    }, []);

    const {
        getRootProps: getRootPropsLogo,
        getInputProps: getInputPropsLogo,
    } = useDropzone({
        onDrop: onDropCompanyLogo,
        accept: "image/*",
    });

    const uploadImage = async (file, path) => {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    };

    const onSubmit = async (data) => {
        if (designation.length < 4) {
            setErrorMsg("Designation must have at least 4 letters.");
            return;
        }


        setLoading(true);
        try {
            let companyLogoUrl = companyLogo;
            if (newCompanyLogo) {
                companyLogoUrl = await uploadImage(newCompanyLogo, `companyLogos/${user.uid}`);
            }

            const userDocRef = doc(db, "users", user.uid);
            const updatedData = {
                companyName: companyName,
                designation: designation,
                companyLogo: companyLogoUrl,
            };
            await updateDoc(userDocRef, updatedData);
            navigate("/fill-social-profiles");
        } catch (error) {
            console.error("Error updating profile:", error);
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
                    <Box sx={{ position: "relative", width: "100%", height: '5rem' }}>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                        <Box component="img"
                            alt="Company Logo"
                            src={tapxcompanyLogo}
                            sx={{
                                width: "250px",
                                // ml: 2,
                                cursor: "pointer",
                            }}
                            onClick={() => navigate('/')}
                        />
                    </Box>

                    <Box sx={{ position: "relative", width: "100%", height: '9rem' }}>
                        <Box component="img"
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
                    <Box sx={{ position: "relative", width: "100%", height: '9rem' }}>
                        <Box component="img"
                            alt="topVector"
                            src={topVector}
                            sx={{
                                width: "250px",
                                position: "absolute",
                                top: 0,
                                right: 0,
                            }}
                        />
                        <Box component="img"
                            alt="Company Logo"
                            src={tapxcompanyLogo}
                            sx={{
                                width: "65px",
                                position: "absolute",
                                top: 2,
                                left: 2,
                                display: { xs: "block", md: "none" }
                            }}
                        />
                        <Typography
                            sx={{
                                textAlign: "center",
                                width: "100%",
                                fontSize: "1.3rem",
                                fontWeight: 600,
                                position: "absolute",
                                zIndex: 2,
                                bottom: 5
                            }}>
                            Fill Company Details
                        </Typography>
                    </Box>

                    <Box sx={{
                        width: { xs: "90%", md: "50%" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit();
                            }}

                            style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                            <Grid container spacing={2} >
                                <Grid item xs={12}>
                                    <CreatingTextField Icon={BusinessIcon} value={companyName} setValue={setCompanyName} placeholder="Enter Comapny Name*" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={HailIcon} value={designation} setValue={setDesignation} placeholder="Enter Designation Name*" />
                                </Grid>
                                <Grid item xs={12}>
                                    {/* {companyLogo && typeof companyLogo === "string" && !newCompanyLogo && (
                                    <Box
                                        sx={{
                                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                            borderRadius: "10px",
                                            padding: "20px",
                                            textAlign: "center",
                                            mb: 2,
                                        }}
                                    >
                                        <img
                                            src={companyLogo}
                                            alt="Company Logo Preview"
                                            style={{
                                                width: "100%",
                                                maxHeight: "200px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Box>
                                )} */}

                                    <Typography sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                        <UploadFileIcon sx={{ color: "#1976d2", ml: "10px" }} /> Upload Company Logo
                                    </Typography>
                                    <Box
                                        {...getRootPropsLogo()}
                                        sx={{
                                            border: "2px dashed #d3d3d3",
                                            padding: "20px",
                                            display: "flex", justifyContent: "center", alignItems: "center",
                                            height: "100px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <input {...getInputPropsLogo()} />
                                        {newCompanyLogo ? (
                                            <img
                                                src={URL.createObjectURL(newCompanyLogo)}
                                                alt="Company Logo Preview"
                                                style={{
                                                    width: "50%",
                                                    maxHeight: "120px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            <Box>
                                                <Typography sx={{ display: { xs: "flex", md: "none" } }}>Click & Browse to Upload</Typography>
                                                <Typography sx={{ display: { md: "flex", xs: "none" } }}>Click & Browse Or Drag & Drop to Upload</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} >{
                                    errorMsg !== "" ?
                                        <Typography sx={{ color: "red", fontSize: "11px", textAlign: "center" }}>{errorMsg}</Typography>
                                        : <Box p={1} />
                                }</Grid>
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

                    <Box sx={{ position: "relative", width: "100%", height: '5rem' }}>
                        <Box component="img"
                            alt="bottomVector"
                            src={bottomVector}
                            sx={{
                                width: "150px",
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                display: { xs: "block", md: "none" }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FillCompanyDetails;