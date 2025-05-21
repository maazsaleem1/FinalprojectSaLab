import React from 'react';
import {
  Container, TextField, Button, Typography, Box, Paper
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const backgroundImage =
  "https://t4.ftcdn.net/jpg/04/72/60/39/360_F_472603936_gtZ5ULKjzrVqN5nvVl9tiFJtak2ikbnb.jpg";

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPasswordPage = () => {
  const handleSubmit = (values) => {
    console.log('Reset password request:', values);
    // Add reset password logic (e.g., API call)
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
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Forgot Password
          </Typography>
           <Box textAlign="center" mb={2}>
                      <img
                        src="https://lh6.ggpht.com/aiY9J8YK8Lzr7hMC7nZWlZGiBn8TF_PY7NVNy5U1i5g4zG8yEPzEZTJK2WwbWJUogg"
                        alt="Logo"
                        width="80"
                      />
                    </Box>
          <Typography variant="body1" align="center" mb={3}>
            Enter your email and we'll send you a reset link.
          </Typography>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  sx={{
                    paddingY: 1.5,
                    fontWeight: 'bold',
                    textTransform: 'none',
                  }}
                >
                  Send Reset Link
                </Button>
              </Form>
            )}
          </Formik>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Remember your password? <Link to="/" style={{ color: '#1976d2' }}>Back to login</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
