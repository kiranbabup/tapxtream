import { useCallback, useEffect, useState, } from "react";
import { Box, Button, Typography, Grid, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import "../phoneSignup.css";
import { dotContainerStyle, dotStyle } from "../../data/styles";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CreatingTextField from "../../components/CreatingTextField";
import tapxcompanyLogo from "../../data/images/tapxtream.png";
import UserHeaderComponent from "../../components/mainComponents/UserHeaderComponent";
import PublicIcon from '@mui/icons-material/Public';
import GoogleIcon from '@mui/icons-material/Google';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const UpdateReviewLinks = () => {
    const [companyName, setcompanyName] = useState("");
    const [websiteReviewUrl, setWebsiteReviewUrl] = useState("");
    const [googleReviewUrl, setgoogleReviewUrl] = useState("");
    const [facebookReviewUrl, setFacebookReviewUrl] = useState("");
    const [instagramReviewUrl, setInstagramReviewUrl] = useState("");
    const [twitterReviewUrl, setTwitterReviewUrl] = useState("");
    const [linkedInReviewUrl, setLinkedInReviewUrl] = useState("");
    const [companyLogo, setCompanyLogo] = useState(null);
    const [newCompanyLogo, setNewCompanyLogo] = useState(null);
    const [companyFieldType, setCompanyFieldType] = useState("text");
    const [logoInStorage, setLogoInStorage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const storage = getStorage();

    const fetchUserData = async () => {
        if (user) {
            const reviewDocRef = doc(db, "review_urls", user.uid);
            const reviewDoc = await getDoc(reviewDocRef);

            if (reviewDoc.exists()) {
                const data = reviewDoc.data();
                setcompanyName(data.companyName || "");
                setCompanyLogo(data.companyLogo || null);
                setWebsiteReviewUrl(data.websiteReviewUrl || "");
                setgoogleReviewUrl(data.googleReviewUrl || "");
                setFacebookReviewUrl(data.facebookReviewUrl || "");
                setInstagramReviewUrl(data.instagramReviewUrl || "");
                setTwitterReviewUrl(data.twitterReviewUrl || "");
                setLinkedInReviewUrl(data.linkedInReviewUrl || "");
            } else {
                // Create empty doc for this user
                await setDoc(reviewDocRef, {
                    companyName: "",
                    websiteReviewUrl: "",
                    googleReviewUrl: "",
                    facebookReviewUrl: "",
                    instagramReviewUrl: "",
                    twitterReviewUrl: "",
                    linkedInReviewUrl: "",
                });
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        const checkLogo = async () => {
            if (user?.uid) {
                try {
                    const logoRef = ref(storage, `companyLogos/${user.uid}`);
                    const url = await getDownloadURL(logoRef);
                    setLogoInStorage(url);
                } catch (error) {
                    setLogoInStorage(null); // Not found
                }
            }
        };
        checkLogo();
    }, [user, storage]);

    const onSubmit = async () => {
        try {
            setLoading(true);

            const reviewDocRef = doc(db, "review_urls", user.uid);
            await setDoc(reviewDocRef, {
                companyName,
                websiteReviewUrl,
                googleReviewUrl,
                facebookReviewUrl,
                instagramReviewUrl,
                twitterReviewUrl,
                linkedInReviewUrl,
            }, { merge: true });
            navigate("/user-profile");
        } catch (error) {
            setErrorMsg("Error updating review links:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: { xs: "100vw", md: "99vw" }, height: "100vh", }}>
            <UserHeaderComponent />
            <Box sx={{ height: "10vh" }} ></Box>
            <Box sx={{
                height: {md:"calc(100vh - 10vh)", xs: "100%"},
                width: "100%", display: "flex",
            }}>
                {/* left */}
                <Box sx={{ width: "50%", display: { xs: "none", md: "block" } }}>
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
                                mb: 0.5,
                                mt: 0.5
                            }}>
                            Manage Review Links
                        </Typography>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit();
                            }}

                            style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                            <Grid container spacing={2} >

                                <Grid item xs={12} >
                                    <CreatingTextField Icon={PublicIcon} value={websiteReviewUrl} setValue={setWebsiteReviewUrl} placeholder="Enter Company Review URL" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={GoogleIcon} value={googleReviewUrl} setValue={setgoogleReviewUrl} placeholder="Enter Google Review URL" />
                                </Grid>
                                <Grid item xs={12}>
                                    <CreatingTextField Icon={FacebookIcon} value={facebookReviewUrl} setValue={setFacebookReviewUrl} placeholder="Enter Facebook Review URL" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={InstagramIcon} value={instagramReviewUrl} setValue={setInstagramReviewUrl} placeholder="Enter Instagram Review URL" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={XIcon} value={twitterReviewUrl} setValue={setTwitterReviewUrl} placeholder="Enter Twitter Review URL" />
                                </Grid>
                                <Grid item xs={12} >
                                    <CreatingTextField Icon={LinkedInIcon} value={linkedInReviewUrl} setValue={setLinkedInReviewUrl} placeholder="Enter LinkedIn Review URL" />
                                </Grid>
                                <Grid item xs={12} sx={{ backgroundColor: "white", borderRadius: "10px", mt: "10px" }}>
                                    <FormControl >
                                        <FormLabel sx={{ color: "black", fontWeight: "bold" }}>Company Details</FormLabel>
                                        <RadioGroup
                                            row
                                            value={companyFieldType}
                                            onChange={e => setCompanyFieldType(e.target.value)}
                                        >
                                            <FormControlLabel value="logo" control={<Radio />} label="Use Company Logo" />
                                            <FormControlLabel value="text" control={<Radio />} label="Company Name as Text" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                {companyFieldType === "text" ? (
                                    <Grid item xs={12} >
                                        <CreatingTextField Icon={DriveFileRenameOutlineIcon} value={companyName} setValue={setcompanyName} placeholder="Enter Company Name" />
                                    </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        {logoInStorage ? (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                {(companyLogo !== logoInStorage) ? (
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        sx={{ borderRadius: "20px", fontWeight: "bold" }}
                                                        onClick={async () => {
                                                            const reviewDocRef = doc(db, "review_urls", user.uid);
                                                            await setDoc(reviewDocRef, { companyLogo: logoInStorage }, { merge: true });
                                                            setCompanyLogo(logoInStorage);
                                                        }}
                                                    >
                                                        Apply Logo
                                                    </Button>
                                                ) : (
                                                    <Typography color="green">Logo already applied</Typography>
                                                )}
                                            </Box>
                                        ) : (
                                            <Typography sx={{ color: "red", fontSize: "13px" }}>
                                                Please upload Logo in <b>Update Info</b>
                                            </Typography>
                                        )}
                                    </Grid>
                                )}

                                <Grid item xs={12} >
                                    {/* {
                                        errorMsg !== "" ? */}
                                    <Typography sx={{ color: "red", fontSize: "11px", textAlign: "center" }}>{errorMsg}</Typography>
                                    {/* : <Box p={1} />
                                    } */}
                                </Grid>

                                <Grid
                                    item
                                    xs={6}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ borderRadius: "20px", fontWeight: "bold" }}
                                        onClick={() => navigate("/user-profile")}
                                    >
                                        Close
                                    </Button>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="success"
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
        </Box>
    );
};

export default UpdateReviewLinks;