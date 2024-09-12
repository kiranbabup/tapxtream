// import React from "react";
// import { Box, Button, Typography } from "@mui/material";
// import profileImage from "../data/sir_Image.jpeg";
// import companyLogo from "../data/Inv_logo-Horizontal.png";
// import fb from "../data/facebook.svg";
// import insta from "../data/instagram.svg";
// import link from "../data/linkedin.svg";
// import twit from "../data/twitter.svg";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { contactInfosx, contactInnersx, headingssx, socialIconStyle } from "../data/styles";
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import vCard from "vcf";
// import withRouter from "../components/withRouter";
// import BaseComponent from "../components/BaseComponent";

// class Profile extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         isAbout: false,
//         isCat: false,
//       };
//     }

//      downloadVCard = () => {
//         // Create a new VCard object using vcf
//         const card = new vCard();
//         // card.set('version', '4.0' );

//         card.set('n', 'pani;kiran;babu;pkb;' );
//         // card.set('n', 'panigrahi;kiran;babu;pkb;' ); --- fields
//         // below are the field names ad display
//         // card.set('n', 'last_name;first_name;middle_name;name_prefix;' ); --- example (pkb kiran babu panigrahi)

//         card.set('org', 'INV Technologies');
//         card.set('title', 'Founder & CEO');
//         card.set('email', 'info@invtechnologies.in');
//         card.set('tel', { 'type': ['home','voice'], 'value': 'uri'}, {'uri':'tel:+918179593300' });
        
//         // card.set('photo', { 'mediatype':  'image/gif'}, "text", `https://img.freepik.com/free-photo/photorealistic-view-tree-nature-with-branches-trunk_23-2151478040.jpg`);

//         const vcfText = card.toString();
//         const element = document.createElement("a");
//         const file = new Blob([vcfText], { type: "text/vcard" });
//         element.href = URL.createObjectURL(file);
//         element.download = "name.vcf";
//         document.body.appendChild(element);
//         element.click();
//     };

//      handlePhoneClick = () => {
//         window.open("tel:+919704808143", "_self");  // Opens phone dialer on mobile devices
//     };

//      handleWebsiteClick = () => {
//         window.open("https://invtechnologies.in", "_blank");  // Opens website in a new tab
//     };

//      handleWhatsappClick = () => {
//         window.open("https://wa.me/9704808143", "_blank"); // Opens WhatsApp chat
//     };
//     renderProfile = (user) => {
//     return (
//       <main className="profile-page" ref={this.mainRef}>
//         <Box sx={{
//             display: "flex", justifyContent: "center",
//             // backgroundColor: "aliceblue"
//         }}>
//             <Box sx={{
//                 width: {
//                     xs: "100vw",
//                     // xs: "320px",
//                     md: "530px"
//                 }, height: "100vh",
//             }}>
//                 <Box
//                     sx={{
//                         background: "linear-gradient(180deg, rgba(2,4,42,1) 35%, rgba(255,255,255,1) 35%, rgba(255,255,255,1) 100%)",
//                         width: "100%", height: { xs: "320px", md: "430px" },
//                         display: "flex", justifyContent: "center", alignItems: "center",
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             width: "90%", height: "80%",
//                             display: "flex",
//                             borderRadius: "16px",
//                             background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(56,56,48,1) 50%, rgba(0,0,0,1) 100%)"
//                             // background: "linear-gradient(to right, #383838,  #050505)"

//                         }}
//                     >
//                         <Box
//                             component="img"
//                             alt="Profile Pic"
//                             src={profileImage}
//                             sx={{ width: "50%", height: "100%", borderTopLeftRadius: "16px", borderBottomLeftRadius: "16px" }}
//                         />
//                         <Box
//                             sx={{
//                                 width: "50%", height: "100%",
//                                 display: "flex", flexDirection: "column", justifyContent: "end",
//                                 padding: "10px",

//                             }}
//                         >
//                             <Typography sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "22px", md: "38px" } }}>Landa</Typography>
//                             <Typography sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "22px", md: "38px" } }}>Chandra</Typography>
//                             <Typography sx={{ color: "white", fontWeight: "bold", fontSize: { xs: "22px", md: "38px" } }}>Sekhar</Typography>
//                             <Typography sx={{ color: "white", fontSize: { xs: "14px", md: "24px" } }}>Founder & CEO</Typography>
//                             <Typography sx={{ color: "white", fontSize: { xs: "10px", md: "18px" } }}>@ INV Technologies</Typography>
//                             <Box p={1} />
//                             <Box
//                                 sx={{
//                                     display: "flex", justifyContent: "end"
//                                 }}
//                             >
//                                 <Box
//                                     component="img"
//                                     alt="Company Logo"
//                                     src={companyLogo}
//                                     sx={{
//                                         width: { xs: "100px", md: "150px" },
//                                     }}
//                                 />
//                             </Box>
//                             <Box p={1.5} />
//                         </Box>
//                     </Box>
//                 </Box>

//                 <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
//                     <Button variant="outlined" onClick={downloadVCard} sx={{ fontWeight: 'normal', fontSize: { xs: '0.7rem', sm: '1rem' }, width: '45%', color: "black", borderColor: "black" }}>Save Contact</Button>
//                     <Button variant="outlined" sx={{
//                         fontWeight: 'normal', fontSize: { xs: '0.7rem', sm: '1rem' }, width: '45%', background: "#02042a", color: "white", '&:hover': { color: "black" }
//                     }} >Exchange Contact</Button>
//                 </Box>

//                 <Box p={1.5} />
//                 <Typography style={headingssx} >Social networks</Typography>
//                 <Box p={1} />
//                 <Box sx={{
//                     display: "flex", justifyContent: "start", alignItems: "center",
//                     paddingLeft: "10px", gap: "8px"
//                 }}>
//                     <Box
//                         component="a"
//                         href="https://www.facebook.com"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         sx={{ ...socialIconStyle, '&:hover': { backgroundColor: 'lightgray' } }}
//                     >
//                         <Box component="img" alt="Facebook" src={fb} sx={{ width: "50px" }} />
//                     </Box>

//                     <Box
//                         component="a"
//                         href="https://www.instagram.com/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         sx={{ ...socialIconStyle, '&:hover': { backgroundColor: 'lightgray' } }}
//                     >
//                         <Box
//                             component="img"
//                             alt="Instagram"
//                             src={insta}
//                             sx={{ width: "50px" }}
//                         />
//                     </Box>
//                     <Box
//                         component="a"
//                         href="https://x.com/login/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         sx={{ ...socialIconStyle, '&:hover': { backgroundColor: 'lightgray' } }}
//                     >
//                         <Box
//                             component="img"
//                             alt="twitter"
//                             src={twit}
//                             sx={{ width: "50px" }}
//                         />
//                     </Box>
//                     <Box
//                         component="a"
//                         href="https://x.com/login"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         sx={{ ...socialIconStyle, '&:hover': { backgroundColor: 'lightgray' } }}
//                     >
//                         <Box
//                             component="img"
//                             alt="linkedin"
//                             src={link}
//                             sx={{ width: "50px" }}
//                         />
//                     </Box>
//                 </Box>
//                 <Box p={1.5} />
//                 <Typography style={headingssx} >Contact info</Typography>
//                 <Box p={1} />

//                 <Box style={contactInfosx} onClick={handlePhoneClick} >
//                     <i class="fa-2xl fas fa-mobile-alt fa-thin" aria-hidden="true" ></i>
//                     <Box style={contactInnersx} sx={{ width: "80%", }}>
//                         <Typography sx={{ fontWeight: "bold" }}>+919704808143</Typography>
//                         <ArrowForwardIosIcon sx={{ color: "lightgray" }} />
//                     </Box>
//                 </Box>

//                 <Box style={contactInfosx} onClick={handleWebsiteClick}>
//                     <i class="fa-2xl fas fa-link fa-thin" aria-hidden="true" ></i>
//                     <Box style={contactInnersx} sx={{ width: "76%" }}>
//                         <Typography sx={{ fontWeight: "bold" }}>invtechnologies.in</Typography>
//                         <ArrowForwardIosIcon sx={{ color: "lightgray" }} />
//                     </Box>
//                 </Box>
//                 <Box style={contactInfosx} onClick={handleWhatsappClick}>
//                     <WhatsAppIcon sx={{ fontSize: '2rem' }} />
//                     <Box style={contactInnersx} sx={{ width: "78%" }}>
//                         <Typography sx={{ fontWeight: "bold" }}>WhatsApp Chat</Typography>
//                         <ArrowForwardIosIcon sx={{ color: "lightgray" }} />
//                     </Box>
//                 </Box>

//                 <Box p={1.5} />
//                 <Typography style={headingssx} >About</Typography>
//                 <Typography sx={{ padding: "14px", textAlign: "justify" }}>
//                     INV Technologies Holds a remarkable place in IT Services AR, VR AND MR - INNOVATIONS and a leading organisation in the field of industrial Embedded Systems, Security Systems, Virtual Reality, Augmented Reality, Mixed Reality and Robotics currently focuses on Virtual Environment Protocols .We at INV emphasise on technical Innovations in IT sector. INV has its own R&D lab at its incubation centre were we encourage research and development for more than 10 companies. INV was founded on August 2014 and is currently incubated at Visakhapatnam, Andhra Pradesh (state), India.
//                 </Typography>
//                 <Box p={2.5} />
//                 <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                     <Typography sx={{ color: "gray" }} >Powered by</Typography>
//                     <Box
//                         component="img"
//                         alt="Company Logo"
//                         src={companyLogo}
//                         sx={{
//                             width: "225px",
//                         }}
//                     />
//                 </Box>
//                 <Box p={1} />
//             </Box>
//         </Box >
//         </main>
//     );
// }
//     render() {
//         return (
//           <BaseComponent collectionName="users" render={this.renderProfile} params={this.props.params} navigate={this.props.navigate} />
//         );
//       }
// }

// export default withRouter(Profile);