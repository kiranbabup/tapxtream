import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography, Grid, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import "../phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../../data/styles";
import CreatingTextField from "../../components/CreatingTextField";
import UserHeaderComponent from "../../components/mainComponents/UserHeaderComponent";
import SelectnBuyComp from "../../components/SelectnBuyComp";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import BusinessIcon from '@mui/icons-material/Business';
import HailIcon from '@mui/icons-material/Hail';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDropzone } from "react-dropzone";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

const UpdateOther = () => {
    const [about, setAbout] = useState("");
    const [clientImages, setClientImages] = useState([]);
    const [newClientImages, setNewClientImages] = useState([]);

    const [paymentStatus, setPaymentStatus] = useState("");
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

                setAbout(data.about || "");
                setClientImages(data.clientImages || []);

                setPaymentStatus(data.paymentStatus || "");
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const storage = getStorage();

    // const onDropProfileImage = useCallback((acceptedFiles) => {
    //     setNewProfileImage(acceptedFiles[0]);
    // }, []);

    // const onDropCompanyLogo = useCallback((acceptedFiles) => {
    //     setNewCompanyLogo(acceptedFiles[0]);
    // }, []);

    // const {
    //     getRootProps: getRootPropsProfile,
    //     getInputProps: getInputPropsProfile,
    // } = useDropzone({
    //     onDrop: onDropProfileImage,
    //     accept: "image/*",
    // });

    // const {
    //     getRootProps: getRootPropsLogo,
    //     getInputProps: getInputPropsLogo,
    // } = useDropzone({
    //     onDrop: onDropCompanyLogo,
    //     accept: "image/*",
    // });

    const uploadImage = async (file, path) => {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    };

    const onSubmit = async (data) => {
        // if (firstName.length < 4) {
        //     setErrorMsg("First Name must have at least 4 letters.");
        //     return;
        // }

        setLoading(true);
        try {
            let clientImageUrls = [...clientImages];
            if (newClientImages.length > 0) {
                const uploadPromises = newClientImages.map((image, index) =>
                    uploadImage(image, `clientImages/${user.uid}/${clientImageUrls.length + index}`)
                );
                const newUrls = await Promise.all(uploadPromises);
                clientImageUrls = [...clientImageUrls, ...newUrls];
            }
            const userDocRef = doc(db, "users", user.uid);
            const updatedData = {
                about: about,
                clientImages: clientImageUrls,
            };
            await updateDoc(userDocRef, updatedData);
            navigate("/user-profile");
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const onDropClientImages = useCallback((acceptedFiles) => {
        setNewClientImages((prevImages) => [...prevImages, ...acceptedFiles]);
    }, []);

    const {
        getRootProps: getRootClientImages,
        getInputProps: getInputClientImages,
    } = useDropzone({
        onDrop: onDropClientImages,
        accept: "image/*",
    });

    return (
        <Box sx={{ width: "100vw", height: { wd: "100vh", xs: "auto" }, }}>
            <UserHeaderComponent />
            <Box sx={{ height: "10vh" }} ></Box>
            {
                ((paymentStatus === "Pending") || (paymentStatus === "")) ?
                    (
                        <SelectnBuyComp />
                    ) : (
                        <Box sx={{ height: "calc(100vh - 10vh)", width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: "1rem", md: "0px" } }} >
                            {/* left */}
                            <Box sx={{ width: { md: "50%", xs: "100%" }, display: "flex", justifyContent: "center", alignItems: "center", mt: { xs: "10px", md: "0px" } }}>
                                <Box
                                    sx={{
                                        width: { xs: "90%", md: "62%" },
                                        height: { xs: "100%", md: "auto" },
                                        // height: { xs: "250px", md: "50%" },
                                        display: "flex",
                                        justifyContent: "center",
                                        borderRadius: "16px",
                                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                                    }}
                                >
                                    {(clientImages.length > 0) ?
                                        <Box sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            alignItems: "center",
                                            width: "95%",
                                            gap: "10px"
                                        }}>
                                            {clientImages.map((url, index) => (
                                                <img
                                                    key={index}
                                                    src={url}
                                                    alt={`Client image ${index}`}
                                                    style={{
                                                        width: "130px",
                                                        height: "130px",
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                        :
                                        <Typography>Not yet added</Typography>
                                    }
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
                                    backgroundColor: { md: "#577fd8d9" }
                                }}
                            >
                                <Box sx={{
                                    width: { xs: "90%", md: "60%" },
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}>
                                    <Typography
                                        sx={{
                                            fontSize: "1.3rem",
                                            fontWeight: "bold",
                                            color: { md: "white" },
                                            mb: 1
                                        }}>
                                        Update Other Details
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
                                                <Typography sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1, mb: 1, color: { md: "white" } }}>
                                                    <UploadFileIcon sx={{ color: { xs: "#1976d2", md: "white" }, ml: "10px" }} /> Upload Client Logos</Typography>
                                                <Box
                                                    {...getRootClientImages()}
                                                    sx={{
                                                        border: "2px dashed #d3d3d3",
                                                        padding: "20px",
                                                        display: "flex",
                                                        justifyContent: "space-evenly",
                                                        alignItems: "center",
                                                        flexWrap:"wrap",
                                                        minHeight: "50px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <input {...getInputClientImages()} />
                                                    {newClientImages.length > 0 ? (
                                                        newClientImages.map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={URL.createObjectURL(image)}
                                                                alt={`Client image Preview ${index}`}
                                                                style={{
                                                                    width: "100px",
                                                                    maxHeight: "100px",
                                                                    objectFit: "cover",
                                                                    marginBottom: "10px",
                                                                }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <Box>
                                                            <Typography sx={{ display: { xs: "flex", md: "none" }, textAlign: "center" }}>Click & Browse to Upload</Typography>
                                                            <Typography sx={{ display: { md: "flex", xs: "none" }, textAlign: "center" }}>Click & Browse Or Drag & Drop to Upload</Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Box sx={{
                                                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                                    borderRadius: "40px",
                                                    width: "100%", height: "12rem",
                                                    display: "flex", flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    // padding: "12px",
                                                    gap: "10px",
                                                    backgroundColor: "white"
                                                }}>
                                                    <Box sx={{ display: "flex", gap: "10px", justifyContent: "start", width: "95%" }}>
                                                        <DisplaySettingsIcon sx={{ color: "#1976d2", ml: "10px" }} />
                                                        <Typography>About Section:</Typography>
                                                    </Box>
                                                    <TextField
                                                        placeholder="Fill here"
                                                        variant="standard"
                                                        type='text'
                                                        multiline
                                                        rows={5}
                                                        // fullWidth
                                                        InputProps={{
                                                            disableUnderline: !about,
                                                        }}
                                                        value={about}
                                                        onChange={(e) => setAbout(e.target.value)}
                                                        sx={{
                                                            width: "92%",
                                                            // padding: "0px 20px",
                                                            "&::before": {
                                                                borderBottom: about
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
                                            {/* <Grid item xs={12} >{
                                                errorMsg !== "" ?
                                                    <Typography sx={{ color: "red", fontSize: "11px", textAlign: "center" }}>{errorMsg}</Typography>
                                                    : <Box p={1} />
                                            }</Grid> */}
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
                                                        "Submit"
                                                    )}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Box p={1} />
                                    </form>

                                </Box>
                            </Box>
                        </Box>
                    )
            }
        </Box>
    );
};

export default UpdateOther;