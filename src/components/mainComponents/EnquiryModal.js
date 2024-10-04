// src/components/EnquiryModal.js
import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Grid, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const schema = z.object({
  enquiryname: z.string().min(1, "Name is required"),
  enquiryphone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  enquiryemail: z.string().email("Invalid email address"),
});

const EnquiryModal = ({ open, onClose, uid }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const existingData = userDoc.data();
        const enquiries = existingData.enquiry || [];

        // Check if phone or email already exists
        const exists = enquiries.some(enq => enq.enquiryphone === data.enquiryphone || enq.enquiryemail === data.enquiryemail);
        if (exists) {
          setError('Phone number or email already exists');
          setLoading(false);
          return;
        }

        // Add new enquiry
        const newEnquiry = { ...data };
        const updatedEnquiries = [...enquiries, newEnquiry];
        await updateDoc(userDocRef, {
          enquiry: updatedEnquiries
        });

        reset();
        onClose();
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: "white", borderRadius: "10px", maxWidth: "500px", margin: "auto", mt: "10%" }}>
        <Typography variant="h6" mb={2}>Enquiry Form</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("enquiryname")}
                label="Name"
                fullWidth
                error={!!errors.enquiryname}
                helperText={errors.enquiryname?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("enquiryphone")}
                label="Phone"
                fullWidth
                error={!!errors.enquiryphone}
                helperText={errors.enquiryphone?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("enquiryemail")}
                label="Email"
                fullWidth
                error={!!errors.enquiryemail}
                helperText={errors.enquiryemail?.message}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={onClose}>Cancel</Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EnquiryModal;