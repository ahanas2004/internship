import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api/api';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', industry: '', location: '' });

  const fetchCompanies = async () => {
    const { data } = await api.get('/companies');
    setCompanies(data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/companies', formData);
      setOpen(false);
      setFormData({ name: '', industry: '', location: '' });
      fetchCompanies();
    } catch (err) {
      alert('Failed to add company');
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Companies</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Company</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell><strong>Company Name</strong></TableCell>
              <TableCell><strong>Industry</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map(company => (
              <TableRow key={company._id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/companies/${company._id}`} size="small" variant="outlined">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>Add Company</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth required label="Company Name" sx={{ mb: 2 }} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <TextField fullWidth label="Industry" sx={{ mb: 2 }} value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} />
            <TextField fullWidth label="Location" sx={{ mb: 2 }} value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
            <Button type="submit" variant="contained" fullWidth>Save</Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Companies;
