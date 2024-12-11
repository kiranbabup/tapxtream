import { Box } from "@mui/material"
import HeaderComponent from "../components/mainComponents/HeaderComponent"

const CreateNFC = () => {
    return (
        <Box sx={{
            // width: "98.93vw",
            // background: "black",
            // height: "100vh",
        }}>
            <HeaderComponent />
            <Box
                sx={{ height: "10vh" }}
            >
            </Box>

            <Box sx={{
                height: { md: "calc(100vh - 10vh)" },
                // color: "white",
                display: "flex", justifyContent: "center"
            }}>
                <Box sx={{
                    width: { xs: "95%", md: "80%" }, display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "center", md: "start" },
                    justifyContent: { xs: "start", md: "space-between" },
                    paddingTop:{xs:"2rem", md:"4rem"}
                }}>
                    <Box
                    sx={{
                        width:{xs:"100%", md:"45%"},
                        height:{xs:"500px", md:"28rem"},
                        // boxShadow: {md:"rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"}
                        // boxShadow: {md:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
                    }}
                    >
                        
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default CreateNFC;