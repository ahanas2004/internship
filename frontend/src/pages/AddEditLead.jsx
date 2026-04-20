import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

const AddEditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', status: 'New', assignedTo: '', company: ''
  });
  
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]); // Assuming backend doesn't have an endpoint for this, we could mock or I will seed

  useEffect(() => {
    // Fetch companies and users
    api.get('/companies').then(res => setCompanies(res.data)).catch(console.error);
    api.get('/users').then(res => setUsers(res.data)).catch(console.error);
    
    if (isEdit) {
      api.get(`/leads/${id}`).then(res => {
        setFormData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || '',
          status: res.data.status,
          assignedTo: res.data.assignedTo?._id || '',
          company: res.data.company?._id || ''
        });
      }).catch(console.error);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/leads/${id}`, formData);
      } else {
        await api.post('/leads', formData);
      }
      navigate('/leads');
    } catch (error) {
      console.error('Failed to save lead', error);
      alert('Failed to save lead');
    }
  };

  return (
    <Box maxWidth="md" mx="auto">
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          {isEdit ? 'Edit Lead' : 'Add Lead'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Name" name="name" value={formData.name} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required type="email" label="Email" name="email" value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Status" name="status" value={formData.status} onChange={handleChange}>
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Contacted">Contacted</MenuItem>
                <MenuItem value="Lost">Lost</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Assigned To" name="assignedTo" value={formData.assignedTo} onChange={handleChange}>
                <MenuItem value=""><em>Unassigned</em></MenuItem>
                {users.map(u => <MenuItem key={u._id} value={u._id}>{u.name} ({u.email})</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Company" name="company" value={formData.company} onChange={handleChange}>
                <MenuItem value=""><em>None</em></MenuItem>
                {companies.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={2} mt={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => navigate('/leads')}>Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddEditLead;
