import { Box } from "@mui/material";
import UserHeaderComponent from '../../components/mainComponents/UserHeaderComponent';
import CompatComp from '../../components/CompatComp';

const MobileCompatablePage = () => {

    return (
        <Box sx={{
            width: "98.93vw",
            background: "black",
        }}>
            <UserHeaderComponent />
            <Box sx={{ height: "10vh" }} ></Box>
            <CompatComp />
        </Box>
    );
};

export default MobileCompatablePage;