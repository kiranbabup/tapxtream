import { Box, Typography } from "@mui/material";
import profileImage from "../data/sir_Image.jpeg";
import companyLogo from "../data/Inv_logo-Horizontal.png";

const Profile = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center",
        backgroundColor:"aliceblue" 
        }}>
            <Box sx={{
                width: { xs: "320px", md: "530px" }, height: "100vh",
            }}>
                <Box sx={{
                    height: "15%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Box
                        component="img"
                        alt="Company Logo"
                        src={companyLogo}
                        sx={{ width: "300px" }}
                    />
                </Box>
                <Box sx={{
                    backgroundImage: `url(${profileImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition:"center",
                    height: "85%",
                    width:"100%"
                }}>
                    <Typography>Chandra Sekhar Landa</Typography>
                </Box>
            </Box>
        </Box>
    );
}

// export default Profile;
