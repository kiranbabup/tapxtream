import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import QRCode from 'react-qr-code';
import { useNavigate } from "react-router-dom";

const QRCodeModal = ({ open, onClose }) => {
  const [qrData, setQrData] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setQrData(`https://tapxtream.invtechnologies.in/profile/${user.uid}`);
    } else {
      navigate("/404");
    }
  }, [user, navigate]);

  const onImageDownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{display: "flex", justifyContent: "end"}}>
        <IconButton sx={{color:"red", width:'2.5rem'}} onClick={onClose}>x</IconButton>
        </Box>
        <Typography sx={{color:"green", textAlign:"center"}}>Scan QR Code to View Profile</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "auto" }}>
          <QRCode id="QRCode" value={qrData} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center", }}>
        <Button variant="outlined" onClick={onImageDownload}>Download QR</Button>
      </DialogActions>
      <Box p={1} />
    </Dialog>
  );
};

export default QRCodeModal;
