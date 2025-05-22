import React, { useEffect, useState } from "react";
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
import ApiServices from '../services/ApiServices.jsx';
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";



const backgroundImage =
  "https://t4.ftcdn.net/jpg/04/72/60/39/360_F_472603936_gtZ5ULKjzrVqN5nvVl9tiFJtak2ikbnb.jpg";

const CreateProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [profile, setProfile] = useState({
    fullName: "",
    gender: "",
    contact: "",
    address: "",
    image: null,
    imagePreview: null,
  });

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) {
      setProfile((prev) => ({
        ...prev,
        fullName: savedName,
      }));
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await ApiServices.createProfile(profile);
    console.log(response.status == 200)

    if (response.status == 200) {
      toast.success("Profile created successfully!");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setProfile({
        fullName: "",
        gender: "",
        contact: "",
        address: "",
        image: null,
        imagePreview: null,
      });
      navigate("/home");
    } else {
      toast.error(response.message || "Failed to create profile.");
    }

    setLoading(false);
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
      <ToastContainer />
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
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? 'creating profile...' : ' Save Profile'}
          </Button>

        </Box>
      </Paper>
    </Box>
  );
};

export default CreateProfilePage;
