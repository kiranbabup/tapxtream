import React from 'react';
import { Box, Typography, IconButton, Drawer, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useMediaQuery } from '@mui/material';
import companyLogo from "../../data/Inv_logo-Horizontal.png";

const HeaderComponent = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box sx={{
            width: "100%",
            height: "10vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position:"fixed",
            zIndex:"10",
            background:"white"
            // boxShadow: "#b7b7d6 -5px -85px 33px -28px inset",
        }}>
            <Box component="img"
                alt="Company Logo"
                src={companyLogo}
                sx={{
                    width: "250px",
                    ml: 2,
                    cursor: "pointer",
                }}
                onClick={() => navigate('/')}
            />

            {isMobile ? (
                <>
                    <IconButton onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <Box
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                            sx={{ width: "250px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", mt: 2 }}
                        >
                            <IconButton onClick={toggleDrawer(false)} sx={{ alignSelf: "flex-start", ml: 2 }}>
                                <ArrowForwardIosIcon color="info" />
                            </IconButton>
                            <Box width="100%"><Divider /></Box>
                            <Typography
                                sx={{ fontWeight: 'bold', cursor: "pointer" }}
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Typography>
                            <Typography
                                sx={{ fontWeight: 'bold', cursor: "pointer" }}
                                onClick={() => navigate("/signup")}
                            >
                                Signup
                            </Typography>
                        </Box>
                    </Drawer>
                </>
            ) : (
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    mr: 2,
                    gap: "20px"
                }}>
                    <Typography
                        sx={{ fontWeight: 'bold', cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Typography>
                    <Typography
                        sx={{ fontWeight: 'bold', cursor: "pointer" }}
                        onClick={() => navigate("/signup")}
                    >
                        Signup
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default HeaderComponent;
