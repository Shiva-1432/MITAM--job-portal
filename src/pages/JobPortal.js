import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

const JobPortal = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Mock job data
  useEffect(() => {
    const mockJobs = [
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        location: 'Hyderabad',
        type: 'Full-time',
        salary: '₹15L - ₹25L',
        description: 'Looking for an experienced software engineer with expertise in React, Node.js, and cloud technologies.',
        requirements: ['5+ years experience', 'React', 'Node.js', 'AWS'],
        postedDate: '2024-03-15'
      },
      {
        id: 2,
        title: 'Frontend Developer',
        company: 'Web Innovations',
        location: 'Bangalore',
        type: 'Full-time',
        salary: '₹12L - ₹18L',
        description: 'Join our team as a frontend developer and work on cutting-edge web applications.',
        requirements: ['3+ years experience', 'React', 'JavaScript', 'CSS'],
        postedDate: '2024-03-14'
      },
      {
        id: 3,
        title: 'Data Scientist',
        company: 'AI Research Labs',
        location: 'Mumbai',
        type: 'Full-time',
        salary: '₹18L - ₹30L',
        description: 'Work on machine learning models and data analysis for our AI products.',
        requirements: ['4+ years experience', 'Python', 'Machine Learning', 'Statistics'],
        postedDate: '2024-03-13'
      },
      {
        id: 4,
        title: 'DevOps Engineer',
        company: 'Cloud Systems',
        location: 'Remote',
        type: 'Full-time',
        salary: '₹14L - ₹22L',
        description: 'Manage and optimize our cloud infrastructure and deployment pipelines.',
        requirements: ['3+ years experience', 'AWS', 'Docker', 'Kubernetes'],
        postedDate: '2024-03-12'
      }
    ];
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  const handleSearch = () => {
    const filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = !selectedLocation || job.location === selectedLocation;
      const matchesType = !selectedType || job.type === selectedType;
      return matchesSearch && matchesLocation && matchesType;
    });
    setFilteredJobs(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#1976d2' }}>
          Job Portal
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Search and Filter Section */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={selectedLocation}
                label="Location"
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <MenuItem value="">All Locations</MenuItem>
                <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                <MenuItem value="Bangalore">Bangalore</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                value={selectedType}
                label="Job Type"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              sx={{ mt: 2 }}
            >
              Search Jobs
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Job Listings */}
      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {job.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="subtitle1" color="text.secondary">
                      {job.company}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Chip
                      icon={<LocationIcon />}
                      label={job.location}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<WorkIcon />}
                      label={job.type}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={job.salary}
                      size="small"
                      color="primary"
                    />
                  </Box>
                  <Typography variant="body1" paragraph>
                    {job.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {job.requirements.map((req, index) => (
                      <Chip
                        key={index}
                        label={req}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Button variant="contained" color="primary" size="large">
                    Apply Now
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobPortal; 