import React, { useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const JobList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data from API
  const jobs = [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Senior Developer',
      location: 'New York, NY',
      status: 'Interview',
      appliedDate: '2024-02-20',
      salary: '$120,000 - $150,000',
    },
    {
      id: 2,
      company: 'StartUp Inc',
      position: 'Full Stack Developer',
      location: 'San Francisco, CA',
      status: 'Applied',
      appliedDate: '2024-02-18',
      salary: '$100,000 - $130,000',
    },
    // Add more mock data as needed
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    const colors = {
      Applied: 'info',
      Interview: 'warning',
      Offer: 'success',
      Rejected: 'error',
      Screening: 'secondary',
    };
    return colors[status] || 'default';
  };

  const filteredJobs = jobs.filter((job) =>
    Object.values(job).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography component="h2" variant="h6" color="primary">
            Job Applications
          </Typography>
          <TextField
            size="small"
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
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.position}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.status}
                        color={getStatusColor(job.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{job.appliedDate}</TableCell>
                    <TableCell>{job.salary}</TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredJobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default JobList; 