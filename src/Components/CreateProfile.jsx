import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const backgroundImage =
  "https://t4.ftcdn.net/jpg/04/72/60/39/360_F_472603936_gtZ5ULKjzrVqN5nvVl9tiFJtak2ikbnb.jpg";

const CreateProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    gender: "",
    contact: "",
    address: "",
    image: null,
    imagePreview: null,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfile({ ...profile, image: file, imagePreview: previewUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Submitted:", profile);
    // Send to backend or store
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 100 + "%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create Profile
        </Typography>
        <Box textAlign="center" mb={2}>
          <img
            src="https://lh6.ggpht.com/aiY9J8YK8Lzr7hMC7nZWlZGiBn8TF_PY7NVNy5U1i5g4zG8yEPzEZTJK2WwbWJUogg"
            alt="Logo"
            width="80"
          />
        </Box>

        <Box component="form" onSubmit={handleSubmit} mt={3}>
          {/* Avatar Upload */}
          <Box textAlign="center" mb={4}>
            <input
              accept="image/*"
              id="upload-photo"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="upload-photo">
              <Avatar
                src={profile.imagePreview}
                sx={{
                  width: isMobile ? 80 : 120,
                  height: isMobile ? 80 : 120,
                  margin: "auto",
                  cursor: "pointer",
                  boxShadow: 3,
                }}
              >
                {profile.fullName ? profile.fullName[0] : "?"}
              </Avatar>
              <Typography
                variant="caption"
                display="block"
                mt={1}
                color="primary"
              >
                Click to upload photo
              </Typography>
            </label>
          </Box>

          {/* Form Fields - All in One Column */}
          <Box mb={3}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              required
            />
          </Box>

          <Box mb={3}>
            <TextField
              select
              fullWidth
              label="Gender"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label="Contact Number"
              name="contact"
              type="tel"
              value={profile.contact}
              onChange={handleChange}
              required
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={3}
              value={profile.address}
              onChange={handleChange}
              required
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              paddingY: 1.4,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Save Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateProfilePage;
