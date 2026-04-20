import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Select, Pagination, IconButton, Chip } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchLeads = async () => {
    try {
      const { data } = await api.get('/leads', {
        params: { search: debouncedSearch, status, page, limit: 10 }
      });
      setLeads(data.leads);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch leads', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [debouncedSearch, status, page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/leads/${id}`);
        fetchLeads();
      } catch (error) {
        console.error('Failed to delete lead', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'info';
      case 'Contacted': return 'success';
      case 'Lost': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Leads</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/leads/add')}>
          Add Lead
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2} mb={4} p={2} component={Paper} elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <TextField
          label="Search by name or email"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{ width: 300 }}
        />
        <Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          displayEmpty
          size="small"
          sx={{ width: 200 }}
        >
          <MenuItem value=""><em>All Statuses</em></MenuItem>
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Contacted">Contacted</MenuItem>
          <MenuItem value="Lost">Lost</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'background.default' }}>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Assigned To</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <TableRow key={lead._id} hover sx={{ transition: '0.2s', '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' } }}>
                  <TableCell sx={{ fontWeight: 500 }}>{lead.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{lead.email}</TableCell>
                  <TableCell>
                    <Chip label={lead.status} color={getStatusColor(lead.status)} size="small" sx={{ fontWeight: 'bold' }} />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{lead.assignedTo?.name || 'Unassigned'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => navigate(`/leads/edit/${lead._id}`)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(lead._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No Leads Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(e, val) => setPage(val)} 
          color="primary" 
        />
      </Box>
    </Box>
  );
};

export default Leads;
