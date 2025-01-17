import { Box, IconButton, Tooltip } from "@mui/material"
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
            }}>
                <Tooltip title="Logout" placement="bottom" arrow>
                    <OutputIcon large />
                </Tooltip>
            </IconButton>
        </Box>
    )
}
export default LogoutButtonComp;