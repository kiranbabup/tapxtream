import { Box, Button, Typography } from "@mui/material";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { contactInfosx, contactInnersx, headingssx } from "../data/styles";

const Profile = () => {
// const downloadVcfFile = () => {
    //     const vcfContent = `BEGIN:VCARD
    // VERSION:3.0
    // FN:Landa Chandra Sekhar
    // N:Sekhar;Landa Chandra;;;
    // TEL;TYPE=CELL:+919704808143
    // EMAIL:chandu@example.com
    // END:VCARD`;
    //     const blob = new Blob([vcfContent], { type: 'text/vcard' });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'contact.vcf';
    //     a.click();
    //     URL.revokeObjectURL(url);
    // };
    return (
        <Box sx={{
            display: "flex", justifyContent: "center",
        }}>
            <Box sx={{
                width: {
                    xs: "100vw",
                    // xs: "320px",
                    md: "530px"
                }, height: "100vh",
            }}>
                <Typography style={headingssx} >Contact info</Typography>
                <Box p={1} />

                <Box style={contactInfosx}>
                    <i class="fa-2xl fas fa-mobile-alt fa-thin" aria-hidden="true" ></i>
                    <Box style={contactInnersx} sx={{width: "80%",}}>
                        <Typography sx={{ fontWeight: "bold" }}>+919704808143</Typography>
                    </Box>
                </Box>

                <Box style={contactInfosx}>
                    <i class="fa-2xl fas fa-link fa-thin" aria-hidden="true" ></i>
                    <Box style={contactInnersx} sx={{width: "76%"}}>
                        <Typography sx={{ fontWeight: "bold" }}>invtechnologies.in</Typography>
                    </Box>
                </Box>

            </Box>
        </Box >
    );
}

// export default Profile;

import { Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};

// export default Router;

