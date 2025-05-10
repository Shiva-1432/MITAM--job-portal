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
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SecurityIcon from '@mui/icons-material/Security';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [language, setLanguage] = useState('English');
  const [highContrast, setHighContrast] = useState(false);

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

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleMenuClose();
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (formData.email && formData.password) {
      localStorage.setItem('token', 'dummy-token');
      navigate('/home');
    } else {
      setError('Please enter both email and password');
    }
  };

  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundImage: 'url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")',
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
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%)',
        zIndex: 1
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
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
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.45)'
            }
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
              mb: 3,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
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
              mb: 3,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            Login
          </Typography>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                backdropFilter: 'blur(5px)',
                bgcolor: 'rgba(211, 47, 47, 0.1)',
                border: '1px solid rgba(211, 47, 47, 0.2)'
              }}
            >
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                    boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.2)'
                  }
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
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                    boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.2)'
                  }
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
                transition: 'all 0.3s ease-in-out',
                '&:hover': { 
                  bgcolor: '#125ea2',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)'
                } 
              }}
            >
              Sign In
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
                transition: 'all 0.3s ease-in-out',
                '&:hover': { 
                  borderColor: '#125ea2',
                  bgcolor: 'rgba(25, 118, 210, 0.04)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.15)'
                }
              }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 