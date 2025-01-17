import { Box, Button, Typography, } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SelectnBuyComp = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem", height: "calc(100vh - 10vh)" }}>
            <Typography sx={{ fontWeight: 600, textAlign: "center" }}>Buy now and Have the Privilege to showcase your profile by a single tap.</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/select-nfctype")}
                sx={{ fontWeight: "bold" }}
            >Select a Card & Purchase</Button>
        </Box >
    );
};

export default SelectnBuyComp;