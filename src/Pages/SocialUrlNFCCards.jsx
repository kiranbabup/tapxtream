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
            cardImage: "https://firebasestorage.googleapis.com/v0/b/tapxtream-64eea.appspot.com/o/websiteImages%2FFacebook.png?alt=media&token=5a090773-d3e9-4b06-b07f-a6bc22ad5c42",
        },
        {
            cardType: "Google Review",
            cardImage: "https://firebasestorage.googleapis.com/v0/b/tapxtream-64eea.appspot.com/o/websiteImages%2FGoogle-review.png?alt=media&token=4a2819d3-5eaa-4d4b-86ad-1a0b1bf574d8",
        },
        {
            cardType: "Instagram",
            cardImage: "https://firebasestorage.googleapis.com/v0/b/tapxtream-64eea.appspot.com/o/websiteImages%2FInstagram.png?alt=media&token=e0ec2b1c-af46-4924-808c-65773934f1a1",
        },
        {
            cardType: "LinkedIn",
            cardImage: "https://firebasestorage.googleapis.com/v0/b/tapxtream-64eea.appspot.com/o/websiteImages%2FLikedin.png?alt=media&token=18ac02d5-bcf8-44e8-8859-4bd1b906f23b",
        },
        {
            cardType: "Twitter",
            cardImage: "https://firebasestorage.googleapis.com/v0/b/tapxtream-64eea.appspot.com/o/websiteImages%2FTwitte.png?alt=media&token=56ae56b7-3608-443c-9920-eeb11f9ef0bf",
        },
        {
            cardType: "WhatsApp",
            cardImage: "https://firebasestorage.googleapis.com/v0/b/tapxtream-64eea.appspot.com/o/websiteImages%2FWatsapp.png?alt=media&token=e645afd8-4234-42b8-8132-f75647e31925",
        },
        {
            cardType: "YouTube",
            cardImage: "https://firebasestorage.googleapis.com/v0/b/tapxtream-64eea.appspot.com/o/websiteImages%2FYoutube.png?alt=media&token=5bcbc782-569e-40c2-8174-f0962975f14e",
        },
    ]

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#f0f0f0", padding: "3rem 0px"
        }}>
            <Typography sx={{
                fontSize: { xs: "1.5rem", md: "3rem" }, fontWeight: "bold",
                textShadow: "3px 2px 2.6px rgb(219 26 26 / 97%)",
                mb: 1
            }}
            >Social Media Cards</Typography>

            <Box sx={{ width: "95%", position: "relative", height: "220px", display:{xs:"block", md:"none"} }}>
                {
                    socialCardsArray.map((social, index) => {
                        return (
                            <Box key={index} sx={{
                                position: "absolute",
                                left:"10%",
                                width: "130px",
                                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                                borderRadius: "6px",
                                padding: "5px",
                                transition: "transform 0.3s",
                                zIndex: socialCardsArray.length - index,
                                transform: `translateX(${index * 30}px)`,
                                '&:hover': {
                                    transform: `translateX(${(index - 1) * 15 * 2}px) scale(1.1)`,
                                    zIndex: socialCardsArray.length,
                                    backgroundColor:"whitesmoke"
                                }
                            }}>
                                <Box component="img"
                                    alt={social.cardType}
                                    src={social.cardImage}
                                    sx={{
                                        cursor: "pointer",
                                        width: "100%",
                                    }}
                                />
                            </Box>
                        );
                    })
                }
            </Box>
            <Box sx={{ width: "95%", position: "relative", height: "400px", display:{xs:"none", md:"block"} }}>
                {
                    socialCardsArray.map((social, index) => {
                        return (
                            <Box key={index} sx={{
                                position: "absolute",
                                left:"20%",
                                width: "250px",
                                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                                borderRadius: "6px",
                                padding: "5px",
                                transition: "transform 0.3s",
                                zIndex: socialCardsArray.length - index,
                                transform: `translateX(${index * 100}px)`,
                                '&:hover': {
                                    transform: `translateX(${(index - 1) * 120}px) scale(1.1)`,
                                    zIndex: socialCardsArray.length
                                }
                            }}>
                                <Box component="img"
                                    alt={social.cardType}
                                    src={social.cardImage}
                                    sx={{
                                        cursor: "pointer",
                                        width: "100%",
                                    }}
                                />
                            </Box>
                        );
                    })
                }
            </Box>
        </Box>
    )
}
export default SocialUrlNFCCards;