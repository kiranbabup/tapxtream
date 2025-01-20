import { Box, Typography } from "@mui/material";
import fbImg from "../data/images/SocialMediaModels/Facebook.png";
import grImg from "../data/images/SocialMediaModels/Google-review.png";
import instaImg from "../data/images/SocialMediaModels/Instagram.png";
import linkedinImg from "../data/images/SocialMediaModels/Likedin.png";
import xImg from "../data/images/SocialMediaModels/Twitte.png";
import whatsappImg from "../data/images/SocialMediaModels/Watsapp.png";
import ytImg from "../data/images/SocialMediaModels/Youtube.png";



const SocialUrlNFCCards = () => {
    const socialCardsArray = [
        {
            cardType: "Facebook",
            cardImage: fbImg,
        },
        {
            cardType: "Google Review",
            cardImage: grImg,
        },
        {
            cardType: "Instagram",
            cardImage: instaImg,
        },
        {
            cardType: "LinkedIn",
            cardImage: linkedinImg,
        },
        {
            cardType: "Twitter",
            cardImage: xImg,
        },
        {
            cardType: "WhatsApp",
            cardImage: whatsappImg,
        },
        {
            cardType: "YouTube",
            cardImage: ytImg,
        },
    ]

    return (
        <Box sx={{
            display: "flex", flexDirection:"column", alignItems: "center", backgroundColor:"white", padding:"3rem 0px"
        }}>
            <Typography sx={{
                    fontSize: { xs: "1.5rem", md: "3rem" }, fontWeight: "bold",
                    textShadow: "3px 2px 2.6px rgb(219 26 26 / 97%)",
                    mb:1
                }}
                >Social Medial Cards</Typography>
            <Box sx={{ width: "95%", display: "flex", justifyContent: {md:"space-between", xs:"space-evenly"}, flexWrap: "wrap", gap: "1rem" }}>
                {
                    socialCardsArray.map((social, index) => {
                        return (
                            <Box key={index} sx={{
                                width: "300px",
                                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                                borderRadius: "6px",
                                padding: "5px",
                            }}>
                                <Box component="img"
                                    alt={social.cardType}
                                    src={social.cardImage}
                                    sx={{
                                        cursor: "pointer",
                                        width:"100%",
                                    }}
                                // onClick={() => navigate('/')}
                                />
                            </Box>
                        );
                    })
                }
            </Box>
        </Box>
    )
}
// export default SocialUrlNFCCards;