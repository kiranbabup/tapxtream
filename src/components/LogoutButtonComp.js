import { Box, IconButton } from "@mui/material"
import OutputIcon from '@mui/icons-material/Output';
import { useNavigate } from "react-router-dom";

const LogoutButtonComp = () => {
    const navigate = useNavigate();

    const onLogoutClick = () => {
        localStorage.removeItem("user");
        navigate('/');
    };
    return (
        <Box>
            <IconButton onClick={() => onLogoutClick()} sx={{
                color: "black",
                "&:hover": {
                    color: "gray",
                },
            }}><OutputIcon large /></IconButton>
        </Box>
    )
}
export default LogoutButtonComp;