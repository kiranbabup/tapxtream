import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography, Grid, } from "@mui/material";
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

const UpdatePersonalDetails = () => {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [designation, setDesignation] = useState("");
    const [companyLogo, setCompanyLogo] = useState(null);
    const [newCompanyLogo, setNewCompanyLogo] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [newProfileImage, setNewProfileImage] = useState(null);
    
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

                setFirstName(data.firstName || "");
                setMiddleName(data.middleName || "");
                setLastName(data.lastName || "");
                setProfileImage(data.profileImage || null);
                setCompanyLogo(data.companyLogo || null);
                setCompanyName(data.companyName || "");
                setDesignation(data.designation || "");

                setPaymentStatus(data.paymentStatus || "");
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const storage = getStorage();

    const onDropProfileImage = useCallback((acceptedFiles) => {
        setNewProfileImage(acceptedFiles[0]);
    }, []);

    const onDropCompanyLogo = useCallback((acceptedFiles) => {
        setNewCompanyLogo(acceptedFiles[0]);
    }, []);

    const {
        getRootProps: getRootPropsProfile,
        getInputProps: getInputPropsProfile,
    } = useDropzone({
        onDrop: onDropProfileImage,
        accept: "image/*",
    });

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
        if (firstName.length < 4) {
            setErrorMsg("First Name must have at least 4 letters.");
            return;
        }

        setLoading(true);
        try {
            let profileImgUrl = profileImage;
            let companyLogoUrl = companyLogo;

            if (newProfileImage) {
                profileImgUrl = await uploadImage(newProfileImage, `profileImages/${user.uid}`);
            }
            if (newCompanyLogo) {
                companyLogoUrl = await uploadImage(newCompanyLogo, `companyLogos/${user.uid}`);
            }

            const userDocRef = doc(db, "users", user.uid);
            const updatedData = {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                companyName: companyName,
                designation: designation,
                companyLogo: companyLogoUrl,
                profileImage: profileImgUrl,
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
            {
                ((paymentStatus === "Pending") || (paymentStatus === "")) ?
                    (
                        <SelectnBuyComp />
                    ) : (
                        <Box sx={{ height: "calc(100vh - 10vh)", width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: "1rem", md: "0px" } }} >
                            {/* left */}
                            <Box sx={{ width: { md: "50%", xs: "100%" }, height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: { xs: "10px", md: "0px" } }}>
                                <Box
                                    sx={{
                                        width: { xs: "90%", md: "60%" }, height: { xs: "250px", md: "50%" },
                                        display: "flex",
                                        borderRadius: "16px",
                                        background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(56,56,48,1) 50%, rgba(0,0,0,1) 100%)",
                                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                                    }}
                                >
                                    <Box
                                        component="img"
                                        alt="Profile Pic"
                                        src={newProfileImage ? URL.createObjectURL(newProfileImage) : profileImage}
                                        sx={{ width: "50%", height: "100%", borderTopLeftRadius: "16px", borderBottomLeftRadius: "16px" }}
                                    />
                                    <Box
                                        sx={{
                                            width: "50%", height: "100%",
                                            display: "flex", flexDirection: "column", justifyContent: "end",
                                            padding: "10px",

                                        }}
                                    >
                                        <Typography sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "16px", md: "22px" } }}>{firstName}</Typography>
                                        <Typography sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "16px", md: "22px" } }}>{middleName}</Typography>
                                        <Typography sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "16px", md: "22px" } }}>{lastName}</Typography>
                                        <Typography sx={{ color: "white", fontSize: { xs: "14px", md: "20px" } }}>{designation}</Typography>
                                        {
                                            companyName && <Typography sx={{ color: "white", fontSize: { xs: "11px", md: "16px" } }}>@ {companyName}</Typography>
                                        }
                                        {companyLogo != null ?
                                            <Box p={1} /> :
                                            <Box p={5} />
                                        }
                                        {companyLogo != null &&
                                            <Box
                                                sx={{
                                                    display: "flex", justifyContent: "end"
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    alt="Company Logo"
                                                    src={newCompanyLogo ? URL.createObjectURL(newCompanyLogo) : companyLogo}
                                                    sx={{
                                                        minWidth: { xs: "100px", md: "150px" },
                                                        maxWidth: "90%",
                                                        maxHeight: { xs: "75px", md: "100px" },
                                                    }}
                                                />
                                            </Box>
                                        }
                                        <Box p={1} />
                                    </Box>
                                </Box>
                            </Box>
                            {/* right */}
                            <Box
                                sx={{
                                    width: { xs: "100%", md: "50%" },
                                    // height: "100%",
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
                                    {/* {user.mobileNumber && <Typography sx={{ mb: 2, }} >
                            {user.mobileNumber}
                        </Typography>
                        } */}
                                    <Typography
                                        sx={{
                                            fontSize: "1.3rem",
                                            fontWeight: "bold",
                                            color: { md: "white" },
                                            mb: 1
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
                                                <CreatingTextField Icon={HailIcon} value={designation} setValue={setDesignation} placeholder="Enter Designation Name*" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CreatingTextField Icon={BusinessIcon} value={companyName} setValue={setCompanyName} placeholder="Enter Comapny Name*" />
                                            </Grid>
                                            
                                            <Grid item xs={12} >{
                                                errorMsg !== "" ?
                                                    <Typography sx={{ color: "red", fontSize: "11px", textAlign: "center" }}>{errorMsg}</Typography>
                                                    : <Box p={1} />
                                            }</Grid>

                                            <Grid item xs={12} md={6}>
                                                <Typography sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1, mb: 1, color:{md:"white"} }}>
                                                <UploadFileIcon sx={{ color:{xs:"#1976d2", md:"white"}, ml: "10px" }} /> Upload Profile Image
                                                </Typography>
                                                <Box
                                                    {...getRootPropsProfile()}
                                                    sx={{
                                                        border: "2px dashed #d3d3d3",
                                                        padding: "20px",
                                                        display: "flex", justifyContent: "center", alignItems: "center",
                                                        height: "100px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <input {...getInputPropsProfile()} />
                                                    {newProfileImage ? (
                                                        <img
                                                            src={URL.createObjectURL(newProfileImage)}
                                                            alt="Profile Image Preview"
                                                            style={{
                                                                width: "50%",
                                                                maxHeight: "120px",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    ) : (
                                                        <Box>
                                                            <Typography sx={{ display: { xs: "flex", md: "none" }, textAlign:"center" }}>Click & Browse to Upload</Typography>
                                                            <Typography sx={{ display: { md: "flex", xs: "none" }, textAlign:"center" }}>Click & Browse Or Drag & Drop to Upload</Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <Typography sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1, mb: 1, color:{md:"white"} }}>
                                                    <UploadFileIcon sx={{ color:{xs:"#1976d2", md:"white"}, ml: "10px" }} /> Upload Company Logo
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
                                                            <Typography sx={{ display: { xs: "flex", md: "none" }, textAlign:"center" }}>Click & Browse to Upload</Typography>
                                                            <Typography sx={{ display: { md: "flex", xs: "none" }, textAlign:"center" }}>Click & Browse Or Drag & Drop to Upload</Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Grid>

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

export default UpdatePersonalDetails;