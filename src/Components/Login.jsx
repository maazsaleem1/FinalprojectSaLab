import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import ApiServices from "../services/ApiServices";
import { ToastContainer, toast } from "react-toastify";


// Background image
const backgroundImage =
  "https://t4.ftcdn.net/jpg/04/72/60/39/360_F_472603936_gtZ5ULKjzrVqN5nvVl9tiFJtak2ikbnb.jpg";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (token) {
    //   navigate("/home");

    // }
  })



  const nav = useNavigate();


  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const data = await ApiServices.login(values.email, values.password);
      console.log('Signup success:', data);
      if (data.status === 200) {
        toast.success("Account Login successfully!");
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", data.data.user.fullName);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        nav("/home");
        resetForm();

      }
      else {
        if (typeof data.message === 'string') {
          toast.error(data.message);
        } else if (Array.isArray(data.message) && data.message[0]?.message) {
          toast.error(data.message[0].message);
        } else {
          toast.error("Something went wrong");
        }
        // navigate("/create-profile");
      }

    } catch (error) {
      console.log('Error occurred during signup.');
    }
    finally {
      setLoading(false);
    }


  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={6}
          sx={{
            padding: 5,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <ToastContainer />
          <Box textAlign="center" mb={2}>
            <img
              src="https://lh6.ggpht.com/aiY9J8YK8Lzr7hMC7nZWlZGiBn8TF_PY7NVNy5U1i5g4zG8yEPzEZTJK2WwbWJUogg"
              alt="Logo"
              width="80"
            />
          </Box>
          <Typography variant="subtitle1" align="center" mb={3}>
            Please log in to your account
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  disabled={loading}

                  startIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  {loading ? 'Loging ...' : 'Login'}
                </Button>

              </Form>
            )}
          </Formik>

          <Grid container justifyContent="space-between" mt={2}>
            <Grid item>
              <Typography variant="body2">
                <Link to="/signup" style={{ color: "#1976d2" }}>
                  Create account
                </Link>
              </Typography>
            </Grid>
            {/* <Grid item>
              <Typography variant="body2">
                <Link to="/forgot-password" style={{ color: "#1976d2" }}>
                  Forgot password?
                </Link>
              </Typography>
            </Grid> */}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
