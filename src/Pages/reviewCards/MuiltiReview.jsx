import React from "react";
import { Box, Button, Typography } from "@mui/material";
import globe from "../../data/world.svg";
import google from "../../data/google.svg";
import fb from "../../data/facebook.svg";
import insta from "../../data/instagram.svg";
import twit from "../../data/twitter.svg";
import link from "../../data/linkedin.svg";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { reviewSocialIconStyle } from "../../data/styles";
import withRouter from "../../components/withRouter";
import BaseComponent from "../../components/BaseComponent";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link } from "react-router-dom";
import BedtimeIcon from '@mui/icons-material/Bedtime';

export const boxStyle = (theme) => ({
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    borderRadius: "10px",
    // m: 1,
    backgroundColor: theme ? '#333' : 'white',
    // position: "relative",
    // ml: 5
});

export const reviewHeadingssx = (theme) => ({
    // paddingLeft: "10px", 
    fontWeight: "bold",
    //   position: "absolute",
    //   top: -25, 
    //   left: -30,
    backgroundColor: theme ? "orange" : "navy",
    borderRadius: "10px",
    padding: "12px",
    width: "80%",
    color: "white"
})

class MultiReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        };
    }

    toggleTheme = () => {
        this.setState((prevState) => ({
            theme: !prevState.theme,
        }));
    };

    renderProfile = (user) => {
        // console.log(user);

        return (
            <main className="profile-page" ref={this.mainRef}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: this.state.theme ? 'black' : 'white',
                    minHeight: "100vh",
                }}>
                    <Box sx={{
                        width: {
                            xs: "100vw",
                            md: "530px"
                        },
                        backgroundColor: this.state.theme ? '#111010' : 'white',
                        color: this.state.theme ? 'white' : 'black',
                        borderRadius: "5px"
                    }}>
                        <Box
                            sx={{
                                // background: "linear-gradient(180deg, rgba(2,4,42,1) 45%, rgba(255,255,255,1) 35%, rgba(255,255,255,1) 100%)",
                                background: "rgba(2,4,42,1)",
                                width: "100%",
                                height: { xs: "50px", md: "80px" },
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}
                        >
                            <Box color="white" sx={{ width: "80%", display: "flex", justifyContent: "end", alignItems: "center", }}>
                                <span>
                                    {this.state.theme ? (<LightModeOutlinedIcon style={{ color: "gray" }} />)
                                        : (<LightModeOutlinedIcon style={{ color: "white" }} />)}
                                </span>
                                <Button onClick={this.toggleTheme}>
                                    {this.state.theme ? (
                                        <i class="fa fa-toggle-on fa-2xl" aria-hidden="true" style={{ color: "green" }}></i>
                                    ) : (
                                        <i class="fa fa-toggle-off fa-2xl" aria-hidden="true" style={{ color: "white" }}></i>
                                    )}
                                </Button>
                                <span>
                                    {this.state.theme ? (<BedtimeIcon style={{ color: "white" }} />)
                                        : (<BedtimeIcon style={{ color: "gray" }} />)}
                                </span>
                            </Box>
                        </Box>

                        <Box p={1} />
                        <Box sx={{ textAlign: "center" }}>
                            {user.companyLogo && user.companyLogo !== "" ? (
                                <Box
                                    component="img"
                                    src={user.companyLogo}
                                    alt="Company Logo"
                                    sx={{
                                        maxWidth: "50%",
                                        maxHeight: "150px",
                                        objectFit: "contain",
                                        mb: 1,
                                    }}
                                />
                            ) : (
                                <Typography variant="h5" sx={{ fontWeight: "bold", color: this.state.theme ? 'white' : 'black' }}>
                                    {user.companyName || "Your Company Name"}
                                </Typography>
                            )}
                        </Box>
                        <Box p={1} />

                        {
                            ((user.websiteReviewUrl || user.googleReviewUrl || user.facebookReviewUrl || user.instagramReviewUrl || user.twitterReviewUrl || user.linkedInReviewUrl) && (user.websiteReviewUrl != "" || user.googleReviewUrl != "" || user.facebookReviewUrl != "" || user.instagramReviewUrl != "" || user.twitterReviewUrl != "" || user.linkedInReviewUrl != "")) && (
                                <>
                                    <Box sx={boxStyle(this.state.theme)}>
                                        <Typography style={reviewHeadingssx(this.state.theme)} >Select an Review Option</Typography>
                                        <Box p={1} />
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start",
                                            justifyContent: "center",
                                            paddingLeft: "10px",
                                            gap: "8px"
                                        }}>
                                            {(user.websiteReviewUrl != "" && user.websiteReviewUrl) &&
                                                <Box
                                                    component="a"
                                                    href={
                                                        user.websiteReviewUrl.startsWith('http://') || user.websiteReviewUrl.startsWith('https://')
                                                            ? user.websiteReviewUrl
                                                            : `https://${user.websiteReviewUrl}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{ ...reviewSocialIconStyle, '&:hover': { backgroundColor: 'lightgray' } }}
                                                >
                                                    Get in touch or Review us
                                                    <Box component="img" alt="Website" src={globe} sx={{ width: "50px", pl: 1 }} />
                                                </Box>
                                            }
                                            {(user.websiteReviewUrl != "" && user.websiteReviewUrl) &&
                                                <Box sx={{ border: `1px solid ${this.state.theme ? "red" : "blue"}`, width: "95%" }} />
                                            }

                                            {(user.googleReviewUrl != "" && user.googleReviewUrl) &&
                                                <Box
                                                    component="a"
                                                    href={
                                                        user.googleReviewUrl.startsWith('http://') || user.googleReviewUrl.startsWith('https://')
                                                            ? user.googleReviewUrl
                                                            : `https://${user.googleReviewUrl}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{ ...reviewSocialIconStyle, '&:hover': { backgroundColor: 'lightgray' } }}
                                                >
                                                    Give us a review on
                                                    <Box component="img" alt="Google" src={google} sx={{ width: "50px", pl: 1 }} />
                                                </Box>
                                            }
                                            {(user.googleReviewUrl != "" && user.googleReviewUrl) &&
                                                <Box sx={{ border: `1px solid ${this.state.theme ? "red" : "blue"}`, width: "95%" }} />
                                            }

                                            {(user.facebookReviewUrl != "" && user.facebookReviewUrl) &&
                                                <Box
                                                    component="a"
                                                    href={
                                                        user.facebookReviewUrl.startsWith('http://') || user.facebookReviewUrl.startsWith('https://')
                                                            ? user.facebookReviewUrl
                                                            : `https://${user.facebookReviewUrl}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{ ...reviewSocialIconStyle, '&:hover': { backgroundColor: 'lightgray' } }}
                                                >
                                                    Give us a review on
                                                    <Box component="img" alt="Facebook" src={fb} sx={{ width: "50px", pl: 1 }} />
                                                </Box>
                                            }

                                            {(user.facebookReviewUrl != "" && user.facebookReviewUrl) &&
                                                <Box sx={{ border: `1px solid ${this.state.theme ? "red" : "blue"}`, width: "95%" }} />
                                            }

                                            {(user.instagramReviewUrl != "" && user.instagramReviewUrl) &&
                                                // {user.instagramUrl != "" &&
                                                <Box
                                                    component="a"
                                                    href={
                                                        user.instagramReviewUrl.startsWith('http://') || user.instagramReviewUrl.startsWith('https://')
                                                            ? user.instagramReviewUrl
                                                            : `https://${user.instagramReviewUrl}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{ ...reviewSocialIconStyle, '&:hover': { backgroundColor: 'lightgray' } }}
                                                >
                                                    Give us a review on
                                                    <Box
                                                        component="img"
                                                        alt="Instagram"
                                                        src={insta}
                                                        sx={{ width: "50px", pl: 1 }}
                                                    />
                                                </Box>
                                            }
                                            {(user.instagramReviewUrl != "" && user.instagramReviewUrl) &&
                                                <Box sx={{ border: `1px solid ${this.state.theme ? "red" : "blue"}`, width: "95%" }} />
                                            }

                                            {(user.twitterReviewUrl != "" && user.twitterReviewUrl) &&
                                                // {user.twitterUrl != "" &&
                                                <Box
                                                    component="a"
                                                    href={user.twitterReviewUrl.startsWith('http://') || user.twitterReviewUrl.startsWith('https://')
                                                        ? user.twitterReviewUrl
                                                        : `https://${user.twitterReviewUrl}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{ ...reviewSocialIconStyle, '&:hover': { backgroundColor: 'lightgray' } }}
                                                >
                                                    Give us a review on
                                                    <Box
                                                        component="img"
                                                        alt="Twitter"
                                                        src={twit}
                                                        sx={{ width: "50px", pl: 1 }}
                                                    />
                                                </Box>
                                            }
                                            {(user.twitterReviewUrl != "" && user.twitterReviewUrl) &&
                                                <Box sx={{ border: `1px solid ${this.state.theme ? "red" : "blue"}`, width: "95%" }} />
                                            }

                                            {(user.linkedInReviewUrl != "" && user.linkedInReviewUrl) &&
                                                // {user.linkedInUrl != "" &&
                                                <Box
                                                    component="a"
                                                    href={user.linkedInReviewUrl.startsWith('http://') || user.linkedInReviewUrl.startsWith('https://')
                                                        ? user.linkedInReviewUrl
                                                        : `https://${user.linkedInReviewUrl}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{ ...reviewSocialIconStyle, '&:hover': { backgroundColor: 'lightgray' } }}
                                                >
                                                    Give us a review on
                                                    <Box
                                                        component="img"
                                                        alt="linkedin"
                                                        src={link}
                                                        sx={{ width: "50px", pl: 1 }}
                                                    />
                                                </Box>
                                            }
                                        </Box>
                                        <Box p={1} />
                                    </Box>
                                </>
                            )
                        }
                    </Box>

                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                            <Typography sx={{ color: "gray" }} >Create your own profile</Typography>
                            <Link to="/" style={{ textDecoration: 'none', }}>
                                Click Here
                            </Link>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                            <Typography sx={{ color: "gray" }} >Powered By</Typography>

                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", cursor: "pointer" }}
                                onClick={() => window.open("https://invtechnologies.in/", "_blank")}
                            >
                                <Typography sx={{ color: "#02437a", fontWeight: "bold" }} >INV</Typography>
                                <Typography sx={{ color: "#fc7f09", fontWeight: "bold" }} >TECHNOLOGIES</Typography>
                            </Box>
                        </Box>
                        <Box p={1} />
                    </Box>
                </Box >
            </main >
        );
    }

    render() {
        return (
            <BaseComponent collectionName="review_urls" render={this.renderProfile} params={this.props.params} navigate={this.props.navigate} />
        );
    }
}

export default withRouter(MultiReview);