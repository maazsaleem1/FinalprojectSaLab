import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Button,
} from '@mui/material';

const ProfilePage = () => {
  // Sample user data (replace with actual user state or props)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe123',
    gender: 'Male',
    address: '1234 Main Street, New York, NY 10001',
    profilePicture: 'https://mui.com/static/images/avatar/1.jpg',
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
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            alt={user.name}
            src={user.profilePicture}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{user.username}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* User Info Box */}
        <Box display="flex" flexDirection="column" gap={2}>
          {[
            { label: 'Email', value: user.email },
            { label: 'Gender', value: user.gender },
            { label: 'Address', value: user.address },
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

        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
