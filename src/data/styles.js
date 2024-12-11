export const contactInfosx = {
  paddingLeft: "15px", display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: 'pointer',
}

export const contactInnersx = {
  paddingRight: "15px",
  paddingLeft: "15px",
  // borderBottom: "1px solid gray",
  borderRadius: "20px",
  '&:hover': {
    background: '#70c7c0',
  },
  width: "90%",
  height: "3rem", display: "flex", alignItems: "center", justifyContent: "space-between"
}

export const contactInneri = {
  width: "15%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}
export const headingssx = {
  // paddingLeft: "10px", 
  fontWeight: "bold", position: "absolute",
  top: -25, left: -30,
  backgroundColor: "navy",
  borderRadius: "10px",
  padding: "12px",
  width: "80%",
  color:"white"
}

export const socialIconStyle = {
  width: "60px", height: "60px", backgroundColor: "#f5f5f5", borderRadius: "15px",
  display: "flex", justifyContent: "center", alignItems: "center",
}
export const textWrap = {
  width: "90%",
  display: "flex",
  flexWrap: "wrap",
  fontWeight: "bold",
}

export const getRupee = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const dotStyle = {
  display: 'inline-block',
  width: '8px',
  height: '8px',
  margin: '0 2px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  animation: 'dot-blink 0.5s infinite both',
};

export const dotContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: "10px 30px",
};

// const getBoxStyle = (theme, additionalStyles = {}) => ({
//   boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//   borderRadius: "10px",
//   m: 1,
//   backgroundColor: theme ? '#333' : 'white',
//   position: "relative",
//   ml: 5,
//   ...additionalStyles
// });

// // Usage in your component
// <Box sx={getBoxStyle(this.state.theme)} />
// <Box sx={getBoxStyle(this.state.theme, { padding: 2 })} />