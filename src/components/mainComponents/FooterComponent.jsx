import React from 'react';
import { Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
// import MenuIcon from '@mui/icons-material/Menu';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useMediaQuery } from '@mui/material';
import companyLogo from "../../data/images/tapxtream.png";
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import { footerLocStyle } from '../../data/styles';

const FooterComponent = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            width: "100%",
            // height: "40vh",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "space-evenly" },
            alignItems: { xs: "center", sm: "start" },
            gap: "1rem",
            background: "#1f1e1d",
            padding: "1rem 0px"
        }}>
            <Box component="img"
                alt="Company Logo"
                src={companyLogo}
                sx={{
                    width: "70px",
                    ml: 3,
                    cursor: "pointer",
                }}
                onClick={() => navigate('/')}
            />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: ".5rem"
            }}>
                <Typography sx={{
                    color: "white", maxWidth: "300px", cursor: "pointer",
                    '&:hover': {
                        color: "darkgray"
                    },
                }} onClick={() => window.open('https://maps.app.goo.gl/h7mDHdaB7BppjBRY7', '_blank')}>
                    <PlaceIcon fontSize='small' /> Satyavathi Nilayam, Door No:49-18-25 (4th floor), Lalitha Nagar, Akkayyapalem, Visakhapatnam, India.
                </Typography>
                <Typography sx={footerLocStyle} onClick={() => window.open('tel:+919248200200')} style={{ cursor: "pointer" }}>
                    <CallIcon fontSize='small' /> Office:&nbsp;&nbsp;&nbsp;+91 9248200200
                </Typography>
                <Typography sx={footerLocStyle} onClick={() => window.open('tel:+919704808143')} style={{ cursor: "pointer" }}>
                    <CallIcon fontSize='small' /> Phone:&nbsp;&nbsp;&nbsp;+91 9704808143
                </Typography>
                <Typography sx={footerLocStyle} onClick={() => window.open('https://wa.me/919704808143')} style={{ cursor: "pointer" }}>
                    <WhatsAppIcon fontSize='small' /> Whatsapp:&nbsp;&nbsp;&nbsp;+91 9704808143
                </Typography>
                <Typography sx={footerLocStyle} onClick={() => window.open('mailto:info@invtechnologies.in')} style={{ cursor: "pointer" }}>
                    <MailIcon fontSize='small' /> info@invtechnologies.in
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: ".5rem"
            }}>
                <a href="/compatible-phones" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"} onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}>Compatible Phones</a>
                <a href="/login" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"} onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}>Login</a>
                <a href="/register-now" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"} onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}>Register</a>
            </Box>
        </Box>
    );
};

export default FooterComponent;