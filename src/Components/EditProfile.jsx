import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider,
    Button,
    TextField,
} from '@mui/material';
import ApiServices from '../services/ApiServices.jsx';
import { ToastContainer, toast } from "react-toastify";


const EditProfilePage = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        gender: '',
        contact: '',
        address: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        const res = await ApiServices.getProfile();
        setUserData(res.data);
    };

    const handleChange = (field, value) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        const res = await ApiServices.createProfile(userData);
        if (res.status === 200) {
            console.log('Profile updated successfully:', res.data.user.fullName);
            localStorage.setItem("username", res.data.user.fullName);
            toast.success("Update Profile successfully!");
            window.location.reload();

        }
        console.log(res);
        setLoading(false);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, px: 2 }}>
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    maxWidth: 500,
                    width: '100%',
                    bgcolor: 'background.paper',
                }}
            >
                <ToastContainer />
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <Typography variant="h5" fontWeight="bold">
                        Edit Profile
                    </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Editable Fields */}
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Full Name"
                        value={userData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={userData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Gender"
                        value={userData.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Contact"
                        value={userData.contact}
                        onChange={(e) => handleChange('contact', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Address"
                        value={userData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                    />
                </Box>

                <Box mt={4} textAlign="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default EditProfilePage;
