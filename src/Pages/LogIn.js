import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: { md: "30%" },
          p: { xs: 2, md: 4 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: "2px solid red",  
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
        >
          Welcome back!
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
        >
          Enter to get unlimited access to data & information.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
          />
          <FormControlLabel
            control={<Checkbox {...register("rememberMe")} />}
            label="Remember me"
            sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
          />
          <Link
            href="#"
            variant="body2"
            sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
          >
            Forgot your password?
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, fontSize: { xs: "0.875rem", md: "1rem" } }}
          >
            Log In
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, fontSize: { xs: "0.75rem", md: "0.875rem" } }}
        >
          Don’t have an account? <Link href="#">Register here</Link>
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          backgroundColor: "#3f51b5",
          display: { xs: "none", md: "block" },
        }}
      >
        {/* Add your background image or design here */}
      </Box>
    </Box>
  );
};

export default LogIn;
