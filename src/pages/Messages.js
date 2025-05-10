import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  InputAdornment,
  Drawer,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

// Enhanced dummy data with categories and more details
const dummyMessages = [
  {
    id: 1,
    sender: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    message: 'Hi, I saw your application for the Frontend Developer position.',
    timestamp: '10:30 AM',
    unread: true,
    category: 'Application',
    jobTitle: 'Frontend Developer',
    company: 'Tech Corp',
    conversation: [
      {
        id: 1,
        sender: 'John Doe',
        message: 'Hi, I saw your application for the Frontend Developer position.',
        timestamp: '10:30 AM'
      },
      {
        id: 2,
        sender: 'You',
        message: 'Yes, I applied yesterday. Thank you for reaching out!',
        timestamp: '10:35 AM'
      }
    ]
  },
  {
    id: 2,
    sender: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    message: 'Would you be available for an interview tomorrow?',
    timestamp: '11:45 AM',
    unread: true,
    category: 'Interview',
    jobTitle: 'Backend Developer',
    company: 'Data Systems',
    conversation: [
      {
        id: 1,
        sender: 'Jane Smith',
        message: 'Would you be available for an interview tomorrow?',
        timestamp: '11:45 AM'
      }
    ]
  },
  {
    id: 3,
    sender: 'Mike Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    message: 'Your profile looks great! Let\'s discuss the role.',
    timestamp: '2:15 PM',
    unread: true,
    category: 'Recruiter',
    jobTitle: 'Full Stack Developer',
    company: 'Web Solutions',
    conversation: [
      {
        id: 1,
        sender: 'Mike Johnson',
        message: 'Your profile looks great! Let\'s discuss the role.',
        timestamp: '2:15 PM'
      }
    ]
  }
];

const categories = ['All', 'Application', 'Interview', 'Recruiter', 'Offer', 'Other'];

const Messages = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notification, setNotification] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = {
        id: Date.now(),
        sender: 'System',
        avatar: 'https://i.pravatar.cc/150?img=5',
        message: 'New job opportunity available!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: true,
        category: 'Notification',
        conversation: []
      };
      setMessages(prev => [randomMessage, ...prev]);
      showNotification('New message received!');
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        avatar: 'https://i.pravatar.cc/150?img=4',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: false,
        category: selectedMessage?.category || 'Other',
        conversation: [...(selectedMessage?.conversation || []), {
          id: Date.now(),
          sender: 'You',
          message: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]
      };
      setMessages(prev => [message, ...prev]);
      setNewMessage('');
      showNotification('Message sent!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setDetailOpen(true);
  };

  const handleMenuClick = (event, message) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessage(message);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = () => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === selectedMessage.id ? { ...msg, unread: false } : msg
      )
    );
    handleMenuClose();
  };

  const handleDeleteMessage = () => {
    setMessages(prev => prev.filter(msg => msg.id !== selectedMessage.id));
    handleMenuClose();
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.sender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || msg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Messages
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={messages.filter(m => m.unread).length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 2 }}>
        <Paper sx={{ mb: 2, p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 1, overflowX: 'auto' }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleCategoryChange(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                sx={{ minWidth: '100px' }}
              />
            ))}
          </Box>
        </Paper>

        <Paper sx={{ flexGrow: 1, mb: 2, overflow: 'auto' }}>
          <List>
            {filteredMessages.map((msg) => (
              <React.Fragment key={msg.id}>
                <ListItem 
                  alignItems="flex-start" 
                  sx={{ 
                    bgcolor: msg.unread ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(25, 118, 210, 0.12)',
                    },
                    cursor: 'pointer'
                  }}
                  onClick={() => handleMessageClick(msg)}
                >
                  <ListItemAvatar>
                    <Badge
                      color="error"
                      variant="dot"
                      invisible={!msg.unread}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    >
                      <Avatar src={msg.avatar} alt={msg.sender} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: msg.unread ? 600 : 400 }}>
                          {msg.sender}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={msg.category} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {msg.timestamp}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMenuClick(e, msg);
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {msg.jobTitle} at {msg.company}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          sx={{ mt: 1 }}
                        >
                          {msg.message}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Paper>

        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <IconButton 
            color="primary" 
            onClick={handleSendMessage}
            sx={{ 
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Container>

      {/* Message Detail Dialog */}
      <Dialog 
        open={detailOpen} 
        onClose={() => setDetailOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedMessage && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={selectedMessage.avatar} alt={selectedMessage.sender} />
                <Box>
                  <Typography variant="h6">{selectedMessage.sender}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {selectedMessage.jobTitle} at {selectedMessage.company}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                {selectedMessage.conversation.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '70%',
                        bgcolor: msg.sender === 'You' ? 'primary.main' : 'grey.100',
                        color: msg.sender === 'You' ? 'white' : 'text.primary',
                      }}
                    >
                      <Typography variant="body1">{msg.message}</Typography>
                      <Typography variant="caption" color={msg.sender === 'You' ? 'inherit' : 'text.secondary'}>
                        {msg.timestamp}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Message Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMarkAsRead}>
          Mark as {selectedMessage?.unread ? 'Read' : 'Unread'}
        </MenuItem>
        <MenuItem onClick={handleDeleteMessage}>Delete Message</MenuItem>
      </Menu>

      {/* Notification Snackbar */}
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="info" onClose={() => setNotification(null)}>
          {notification}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Messages; 