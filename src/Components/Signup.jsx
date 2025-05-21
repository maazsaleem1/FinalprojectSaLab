// SignupPage.jsx
import React from 'react';
import {
  Container, TextField, Button, Typography, Box, Paper, Grid
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link,useNavigate } from 'react-router-dom';

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const backgroundImage = 'https://t4.ftcdn.net/jpg/04/72/60/39/360_F_472603936_gtZ5ULKjzrVqN5nvVl9tiFJtak2ikbnb.jpg';

const SignupPage = () => {
      const navigate = useNavigate();
  const handleSubmit = (values, { resetForm }) => {
    console.log('Signup form values:', values);
    navigate("/create-profile")
    resetForm();
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Create Account
          </Typography>
           <Box textAlign="center" mb={2}>
                      <img
                        src="https://lh6.ggpht.com/aiY9J8YK8Lzr7hMC7nZWlZGiBn8TF_PY7NVNy5U1i5g4zG8yEPzEZTJK2WwbWJUogg"
                        alt="Logo"
                        width="80"
                      />
                    </Box>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
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
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Box>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container justifyContent="flex-end" mt={2}>
            <Grid item>
              <Typography variant="body2">
                Already have an account? <Link to="/">Log in</Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage;
