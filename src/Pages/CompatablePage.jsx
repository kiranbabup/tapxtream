import { Box } from "@mui/material";
import HeaderComponent from "../components/mainComponents/HeaderComponent";
import CompatComp from '../components/CompatComp';
import FooterComponent from "../components/mainComponents/FooterComponent";

const CompatablePage = () => {

    return (
        <Box sx={{
            width: "98.93vw",
            // width: "100vw",
            background: "black",
        }}>
            <HeaderComponent />
            <Box sx={{ height: "10vh" }} ></Box>
            <CompatComp />
            <FooterComponent />
        </Box>
    );
};

export default CompatablePage;