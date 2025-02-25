import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Divider,
  useTheme,
} from '@mui/material';

// Import icons
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import FolderIcon from '@mui/icons-material/Folder';
import TaskIcon from '@mui/icons-material/Task';

const UserDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user) || {};

  // Menu Items
  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'Projects', icon: <FolderIcon />, path: '/projects' },
    { text: 'Tasks', icon: <TaskIcon />, path: '/tasks' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Stats data
  const statsData = [
    { title: 'Total Projects', value: '8', color: '#2196f3' },
    { title: 'Active Tasks', value: '12', color: '#4caf50' },
    { title: 'Completed', value: '85%', color: '#ff9800' },
    { title: 'Team Members', value: '6', color: '#f44336' },
  ];

  // Helper function to get user display name
  const getDisplayName = () => {
    if (!user) return 'Guest';
    
    // For Google login
    if (user.provider === 'google') {
      return user.googleName?.split(' ')[0] || 'User';
    }
  
    // For regular login, clean up the name
    const fullName = user.fullName || user.username || '';
    
    // Remove any numbers or special characters after the name
    const cleanName = fullName.split(/[^a-zA-Z\s]/)[0].trim();
    
    // If name is empty after cleaning, return default
    return cleanName || 'User';
  };
  
  // Helper function to get user email
  const getEmail = () => {
    return user?.email || 'No email provided';
  };

  const handleLogout = () => {
    // Implement your logout logic here
    navigate('/login');
  };

  // Stat Card Component
  const StatCard = ({ title, value, color }) => (
    <Card 
      sx={{ 
        height: '100%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ color, fontWeight: 'bold', mb: 1 }}>
          {value}
        </Typography>
        <Typography color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          bgcolor: 'white',
          borderRight: '1px solid #eee',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* User Profile Section */}
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mx: 'auto',
              mb: 2,
              bgcolor: theme.palette.primary.main,
              fontSize: '2.5rem',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          >
            {getDisplayName().charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {getDisplayName()}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              mb: 1,
              wordBreak: 'break-word'
            }}
          >
            {getEmail()}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.main',
              py: 0.5,
              px: 2,
              borderRadius: 1,
              display: 'inline-block',
            }}
          >
            {user?.role || 'Member'}
          </Typography>
        </Box>

        <Divider />

        {/* Navigation Menu */}
        <List sx={{ px: 2, py: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}

          <Divider sx={{ my: 2 }} />

          <ListItem
            button
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              color: 'error.main',
              '&:hover': {
                bgcolor: 'error.light',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: '280px',
          p: 3,
        }}
      >
        <Container maxWidth="xl">
          {/* Welcome Card */}
          <Card 
            sx={{ 
              mb: 4,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Welcome back, {getDisplayName()}!
              </Typography>
              <Typography color="text.secondary">
                Here's your dashboard overview for today.
              </Typography>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatCard {...stat} />
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity */}
          <Card 
            sx={{ 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Recent Activity
              </Typography>
              <Box
                sx={{
                  p: 4,
                  bgcolor: '#f8f9fa',
                  borderRadius: 1,
                  textAlign: 'center',
                }}
              >
                <Typography color="text.secondary">
                  No recent activity to display
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default UserDashboard;