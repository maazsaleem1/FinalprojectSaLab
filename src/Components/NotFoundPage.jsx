// src/pages/NotFoundPage.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            textAlign="center"
        >
            <Typography variant="h2" color="error" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" mb={4}>
                The page you're looking for doesn't exist.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Go to Home
            </Button>
        </Box>
    );
};

export default NotFoundPage;
