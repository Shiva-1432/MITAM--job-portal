import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SecurityIcon from '@mui/icons-material/Security';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [isMuted, setIsMuted] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Theme switching logic
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#d6f5f5';
      document.body.style.color = '#000000';
    }
  }, [isDarkMode]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsOpen = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleMenuClose();
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleHighContrastToggle = () => {
    setHighContrast(!highContrast);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' }
  ];

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 2, flexGrow: 1 }}>
          <span style={{ fontFamily: 'cursive', color: '#222' }}>ME</span>
          <span style={{ color: '#1976d2' }}>TAM</span>
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Tooltip title="Calendar">
            <IconButton 
              color="primary" 
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.1)' 
                }
              }}
            >
              <CalendarMonthIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton 
              color="primary" 
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.1)' 
                }
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Help">
            <IconButton 
              color="primary" 
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.1)' 
                }
              }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Sound">
            <IconButton 
              color="primary" 
              onClick={handleMuteToggle}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.1)' 
                }
              }}
            >
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Theme">
            <IconButton 
              color="primary" 
              onClick={handleThemeToggle}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.1)' 
                }
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Language">
            <IconButton 
              color="primary" 
              onClick={handleMenuOpen}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.1)' 
                }
              }}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: { width: 200, maxHeight: 400 }
            }}
          >
            {languages.map((lang) => (
              <MenuItem 
                key={lang.code} 
                onClick={() => handleLanguageChange(lang.name)}
                selected={language === lang.name}
              >
                <ListItemIcon>
                  <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
                </ListItemIcon>
                <ListItemText>{lang.name}</ListItemText>
              </MenuItem>
            ))}
          </Menu>

          <Tooltip title="Settings">
            <IconButton 
              color="primary" 
              onClick={handleSettingsOpen}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.1)' 
                }
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={settingsAnchorEl}
            open={Boolean(settingsAnchorEl)}
            onClose={handleSettingsClose}
            PaperProps={{
              sx: { width: 300 }
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <AccessibilityNewIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Accessibility</ListItemText>
              <FormControlLabel
                control={
                  <Switch
                    checked={highContrast}
                    onChange={handleHighContrastToggle}
                    size="small"
                  />
                }
                label="High Contrast"
              />
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <SecurityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Security Settings</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <EmailIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Email Preferences</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <PhoneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Mobile Settings</ListItemText>
            </MenuItem>
          </Menu>

          <Tooltip title="Profile">
            <IconButton 
              color="primary" 
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(25, 118, 210, 0.1)' 
                }
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    localStorage.setItem('token', 'dummy-token');
    navigate('/home');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
      }
    }}>
      <TopBar />
      <Container 
        component="main" 
        maxWidth="xs" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '80vh',
          position: 'relative',
          zIndex: 2
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            padding: 4, 
            width: '100%', 
            borderRadius: 4, 
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <Typography 
            component="h1" 
            variant="h5" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 700, 
              color: '#1976d2', 
              letterSpacing: 1,
              mb: 3
            }}
          >
            Job Application Tracker
          </Typography>
          <Typography 
            component="h2" 
            variant="h6" 
            align="center" 
            gutterBottom 
            sx={{ 
              color: '#222',
              mb: 3
            }}
          >
            Create Account
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              mt: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2 
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              autoFocus
              value={formData.fullName}
              onChange={handleChange}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 2, 
                borderRadius: 2, 
                fontWeight: 600, 
                bgcolor: '#1976d2', 
                color: 'white', 
                '&:hover': { 
                  bgcolor: '#125ea2',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                } 
              }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ 
                mt: 1, 
                borderRadius: 2, 
                fontWeight: 600, 
                color: '#1976d2', 
                borderColor: '#1976d2',
                '&:hover': { 
                  borderColor: '#125ea2',
                  bgcolor: 'rgba(25, 118, 210, 0.04)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
              onClick={handleLogin}
            >
              Already have an account? Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register; 