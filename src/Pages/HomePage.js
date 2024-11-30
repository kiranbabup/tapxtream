import { Box, Button, Typography } from "@mui/material"
import HeaderComponent from "../components/mainComponents/HeaderComponent";
import { clientsLogos } from "../data/clientsLogo";
import PlaceIcon from '@mui/icons-material/Place';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import imageHere from "../data/images/imagehere.png";
import SectioneImage from "../data/images/Nfc-banner_mainPage.png";
import NFCCarddes from "../data/images/nfc-card_type1_blackGold.png";
import { fourProperties } from "../data/contents/HomepageContent.js";

const HomePage = () => {
    return (
        <Box sx={{
            width: "98.93vw",
            background: "black",
            // height: "100vh",
        }}>
            <HeaderComponent />
            <Box
                sx={{ height: "10vh" }}
            ></Box>

            <Box sx={{
                height: { md: "calc(100vh - 10vh)" },
                color: "white",
                display: "flex", justifyContent: "center"
            }}>
                <Box sx={{ width: { xs: "95%", md: '90%' }, display: "flex", flexDirection: { xs: "column-reverse", md: "row" }, alignItems: "center", justifyContent: { md: "space-between" } }} >
                    <Box sx={{ width: { md: "45%", xs: "90%" }, height: { md: "30vh", xs: "10vh" }, display: "flex", flexDirection: "column", justifyContent: "center", padding: "1rem 0px" }} >
                        <Typography sx={{ fontSize: { xs: "1.5rem", md: "3rem" }, fontWeight: "bold", textShadow: "4px 4px 2.6px rgb(219 26 26 / 97%)" }} >The FUTURE in single tap</Typography>
                        <Typography sx={{ fontSize: { xs: "1rem", md: "1.5rem" }, }} >Instantly share your profile with a single tap!</Typography>
                    </Box>
                    <Box sx={{ width: { md: "45%", xs: "80%" }, }} >
                        <Box sx={{
                            width: "100%",
                            height: { xs: "100%", md: "90.5vh" },
                            borderRadius: "10px",
                            // objectFit: "scale-down",
                            objectFit: "contain",
                        }}
                            component="img"
                            src={SectioneImage}
                            alt="imagehere" />
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                height: { md: "3rem", xs: "4rem" },
                background: "#fd710b",
                color: "black",
                display: "flex",
                alignItems: "center", justifyContent: "center"
            }}>
                <Typography sx={{ width: { md: "70%", xs: "90%" }, display: "flex", justifyContent: "center", alignItems: { md: "center", xs: "start" }, color: "white", fontWeight: "bold", fontSize: { xs: "0.9rem", md: "1.2rem" }, }}>
                    <LocationOnOutlinedIcon /> India's Number one NFC Cards & Business Profiles Company INV Technologies
                </Typography>
            </Box>

            <Box sx={{
                height: { md: "calc(100vh - 8vh)" },
                backgroundColor: "#f0f0f0",
                color: "black",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center"
            }}>
                <Box sx={{ width: { md: "90%", xs: "90%" }, display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: { xs: "center", md: "space-evenly" }, paddingBottom: "1.5rem", alignItems: "center" }}>
                    <Box sx={{ width: { md: "35%", xs: "80%" }, }} >
                        <Box sx={{
                            width: "100%",
                            height: { xs: "40vh", md: "90.5vh" },
                            borderRadius: "10px",
                            // objectFit: "scale-down",
                            objectFit: "contain",
                        }}
                            component="img"
                            src={NFCCarddes}
                            alt="imagehere" />
                    </Box>
                    <Box sx={{ width: { md: "45%", xs: "90%" }, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "cneter" }} >
                        <Typography sx={{ fontSize: { xs: "1.2rem", md: "2rem" }, fontWeight: "bold" }} >NFC Business Card for Corporate Professionals</Typography>
                        <Typography color="error" sx={{ fontSize: { md: "2rem", xs: "1.5rem" }, fontWeight: "bold" }}>₹599.00 <del style={{ color: "gray", fontWeight: "lighter" }}>₹999.00</del></Typography>
                        <Typography sx={{ fontSize: { xs: "0.8rem", md: "1rem" }, textAlign: "justify" }} >NFC Cards are revolutionary way to connect people and businesses. Share information, photos, and videos instantly with a single tap or scan. Explore the possibilities</Typography>
                        <Box>
                            <Button variant="contained" sx={{
                                backgroundColor: "#fd710b", padding:"10px 50px", fontSize: { md: "1.5rem" }, borderRadius: "50px", mt: 1, '&:hover': {
                                    backgroundColor: 'black',
                                },
                            }}>Design Your Card</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                background: "#fd710b",
                color: "white",
                padding: { md: "2rem 0px", xs: "1rem 0px" },
                display: "flex", flexDirection: { md: "row", xs: "column", },
                justifyContent: { md: "space-evenly", xs: "center" }, alignItems: "center", gap: "1rem"
            }}>
                {
                    fourProperties.map((prop, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                            <Box sx={{
                                width: "80px",
                                height: "120px",
                                // borderRadius: "10px",
                                // objectFit: "scale-down",
                                objectFit: "contain",
                            }}
                                component="img"
                                src={prop.pic}
                                alt="imagehere"
                            />
                            <Typography sx={{
                                fontWeight: "bold", fontSize: { md: "1.8rem", xs: "1.5rem" }
                            }}>{prop.head}</Typography>
                            <Typography>{prop.content}</Typography>
                        </Box>
                    ))
                }
            </Box>

            <Box sx={{
                // height: { md: "calc(100vh - 8vh)" },
                backgroundColor: "white",
                color: "black",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "1.5rem 0px"
            }}>
                <Typography sx={{
                    fontSize: { xs: "1.5rem", md: "3rem" }, fontWeight: "bold",
                    textShadow: "3px 2px 2.6px rgb(219 26 26 / 97%)",
                }}
                >Our Clients</Typography>
                <Box sx={{ width: "90%", display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
                    {
                        clientsLogos.map((cl, i) => (
                            <Box sx={{
                                width: { xs: "150px", md: "250px" },
                                borderRadius: "10px",
                                // objectFit: "scale-down",
                                objectFit: "contain",
                            }}
                                component="img"
                                src={cl.clientImg}
                                alt={cl.clientName} />
                        ))
                    }
                </Box>
            </Box>

        </Box>
    )
}
export default HomePage;