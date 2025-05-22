import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import MenuIcon from '@mui/icons-material/Menu'; // Menu icon for mobile drawer toggle

const drawerWidth = 240;

const MainLayout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen is small (mobile)

  const [name, setname] = useState(localStorage.getItem("username"));

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    console.log('Logging out...');
    toast.success('Successfully logged out!', {

      autoClose: 3000, // Auto close in 3 seconds
      hideProgressBar: false, // Show progress bar
      closeOnClick: true, // Allow closing the toast when clicked
      pauseOnHover: true, // Pause the toast when hovered
      draggable: true, // Allow dragging the toast
    });
    setAnchorEl(null);
    navigate('/');
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerItems = [
    { label: 'Todo', path: '/home' },
    { label: 'Profile', path: '/profile' },
    { label: 'Edit Profile', path: '/editprofile' },
    { label: 'Logout', path: '/' },

  ];

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: '#3f51b5',
        height: '100vh',
        color: '#fff',
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        {name}
      </Typography>
      <List>
        {drawerItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.path}
              selected={isSelected}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 1,
                mx: 1,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: '#5c6bc0',
                  color: '#fff',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#3949ab',
                },
                '&:hover': {
                  backgroundColor: '#3f51b5',
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Drawer - Temporary for mobile, permanent for large screens */}
      <ToastContainer />
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true} // Only toggle on mobile
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#3f51b5',
            color: '#fff',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* AppBar */}
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Menu Button for Mobile */}
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  display: { xs: 'block', sm: 'none' }, // Show on mobile only
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography variant="h6">Dashboard</Typography>

            {/* Avatar for Profile Menu */}
            <Box>
              <IconButton
                onClick={handleAvatarClick}
                color="inherit"
                sx={{
                  display: { xs: 'none', sm: 'block' }, // Hide on mobile, show on large screens
                }}
              >
                <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Nested route content */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
