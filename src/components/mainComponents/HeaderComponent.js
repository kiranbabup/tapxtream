import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import companyLogo from "../../data/Inv_logo-Horizontal.png";

const HeaderComponent = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            width: "100vw",
            height: "10vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "#b7b7d6 0px -50px 36px -28px inset"
        }}>
            <Box component="img"
                alt="Company Logo"
                src={companyLogo}
                sx={{
                    width: "150px",
                    ml:2
                }}
            />
            <Box>
                <Button
                    // variant="outlined"
                    sx={{ marginRight: 2, fontWeight: 'normal' }}

                    onClick={()=>navigate("/login")}
                >
                    Login
                </Button>

                <Button
                    // variant="contained"
                    sx={{ marginRight: 2, fontWeight: 'normal' }}
                    onClick={()=>navigate("/signup")}
                >
                    Signup
                </Button>

            </Box>
        </Box>
    )
}
export default HeaderComponent;