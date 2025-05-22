import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import ApiServices from '../services/ApiServices.jsx';

const ProfilePage = () => {

  const [loading, setLoading] = useState(false);
  const [userData, setuserData] = useState(null);
  // Sample user data (replace with actual user state or props)
  const user = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe123',
    gender: 'Male',
    address: '1234 Main Street, New York, NY 10001',
    profilePicture: 'https://mui.com/static/images/avatar/1.jpg',
  };

  useEffect(() => {
    // setuserData(user)
    getUserProfile()

  }, [])

  const getUserProfile = async () => {
    var res = await ApiServices.getProfile();
    console.log(res);
    setuserData(res.data);
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, px: 2 }}>
      {userData === null ? <></> : <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 500,
          width: '100%',
          bgcolor: 'background.paper',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>

          <Typography variant="h5" fontWeight="bold">
            {userData.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{userData.email}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* User Info Box */}
        <Box display="flex" flexDirection="column" gap={2}>
          {[
            { label: 'Email', value: userData.email },
            { label: 'Gender', value: userData.gender },
            { label: 'Contact', value: userData.contact },
            { label: 'Address', value: userData.address },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                p: 2,
                bgcolor: '#fafafa',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="body1">{item.value}</Typography>
            </Box>
          ))}
        </Box>

        {/* <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </Box> */}
      </Paper>}

    </Box>
  );
};

export default ProfilePage;
