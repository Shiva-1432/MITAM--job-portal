import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  // Mock data - replace with actual data from API
  const stats = [
    { title: 'Total Applications', value: 25, icon: <WorkIcon /> },
    { title: 'Interviews', value: 8, icon: <CheckCircleIcon /> },
    { title: 'Upcoming', value: 3, icon: <ScheduleIcon /> },
    { title: 'Success Rate', value: '32%', icon: <TrendingUpIcon /> },
  ];

  const recentApplications = [
    { company: 'Tech Corp', position: 'Senior Developer', status: 'Interview', date: '2024-02-20' },
    { company: 'StartUp Inc', position: 'Full Stack Developer', status: 'Applied', date: '2024-02-18' },
    { company: 'Enterprise Co', position: 'Frontend Developer', status: 'Screening', date: '2024-02-15' },
  ];

  const chartData = [
    { name: 'Jan', applications: 4 },
    { name: 'Feb', applications: 6 },
    { name: 'Mar', applications: 8 },
    { name: 'Apr', applications: 5 },
    { name: 'May', applications: 7 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {stat.icon}
                <Typography component="h2" variant="h6" color="primary" sx={{ ml: 1 }}>
                  {stat.title}
                </Typography>
              </Box>
              <Typography component="p" variant="h4">
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Applications Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 360 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Applications Overview
            </Typography>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Applications */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 360 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Applications
            </Typography>
            <List>
              {recentApplications.map((app, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={app.company}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {app.position}
                          </Typography>
                          {` — ${app.status} (${app.date})`}
                        </>
                      }
                    />
                  </ListItem>
                  {index < recentApplications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 