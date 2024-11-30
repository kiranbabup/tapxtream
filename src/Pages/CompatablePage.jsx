import React, { useState } from 'react';
import { Box, TextField, Typography } from "@mui/material";
import HeaderComponent from "../components/mainComponents/HeaderComponent";
import { compatiblePhones } from "../data/contents/compatableDevices";

const CompatablePage = () => {
    const [searchText, setSearchText] = useState("");

    const onSearchEnter = (e) => {
        setSearchText(e.target.value)
    };

    const filteredPhones = compatiblePhones
        .map(category => ({
            ...category,
            phones: category.phones.filter(phone => 
                phone.toLowerCase().includes(searchText.toLowerCase())
            )
        }))
        .filter(category => category.phones.length > 0);

    return (
        <Box sx={{
            width: "98.93vw",
            background: "black",
        }}>
            <HeaderComponent />
            <Box sx={{ height: "10vh" }} ></Box>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "white", width: "100%" }}>
                <Box sx={{ padding: { md: "5rem 0px", xs: "2rem 0px" }, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fd710b", width: "100%" }}>
                    <Typography sx={{ mb: 4, fontSize: { xs: "1.5rem", md: "3rem" }, fontWeight: "bold", textAlign: "center", pl: "20px", pr: "20px" }}>Is your device compatible with NFC Card</Typography>
                    <Typography sx={{ mb: 2, fontSize: { xs: "1rem", md: "1.5rem" }, textAlign: "center", pl: "20px", pr: "20px" }}><b>INV's TapXtream</b> uses technology that is compatible with most newer iPhone and Android devices.</Typography>
                    <Typography sx={{ mb: 2, fontSize: { xs: "1.3rem", md: "1.7rem" }, fontWeight: "bold", textAlign: "center", pl: "20px", pr: "20px" }}>Check the list below to see if your device is NFC compatible. If not, Qr code is accepted by most of the smartphones.</Typography>
                </Box>
                <Box sx={{ padding: { md: "4rem 0px", xs: "2rem 0px" }, textAlign: "center" }}>
                    <Typography sx={{ mb: 4, fontSize: { xs: "1.5rem", md: "3rem" }, fontWeight: "bold" }}>Search Your Device Here</Typography>
                    <TextField id="outlined-basic" placeholder="Search phone model here" variant="outlined" type="text" onChange={(e) => onSearchEnter(e)} value={searchText}
                        sx={{ backgroundColor: "whitesmoke", borderRadius: "5px" }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", width: "100%", mb: "2rem" }} >
                    {filteredPhones.length > 0 ? (
                        filteredPhones.map((cp, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: { md: "80%", xs: "90%" },
                                    border: "1px solid white",
                                    borderRadius: "1rem",
                                    padding: "10px",
                                }}
                            >
                                <Typography variant="h5" sx={{ fontWeight: "bold", pl: 1 }}>
                                    {cp.title}
                                </Typography>
                                <Box p={2} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: { md: "3rem", xs: "1rem" },
                                        flexWrap: "wrap",
                                        pl: 1,
                                    }}
                                >
                                    {cp.phones.map((n, index) => (
                                        <Typography key={index} width="150px">
                                            {n}
                                        </Typography>
                                    ))}
                                </Box>
                                <Box p={1} />
                            </Box>
                        ))
                    ) : (
                        <Typography variant="h6" sx={{ color: "red", textAlign: "center" }}>
                            The entered Device model is not Compatible for NFC Card
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CompatablePage;