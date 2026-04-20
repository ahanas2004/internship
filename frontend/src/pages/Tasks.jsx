import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, Select, MenuItem, Chip, FormControl, InputLabel } from '@mui/material';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [leads, setLeads] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({ title: '', lead: '', assignedTo: user?._id || '', dueDate: '' });

  const fetchTasks = async () => {
    const { data } = await api.get('/tasks');
    setTasks(data);
  };

  const fetchLeads = async () => {
    // Ideally an endpoint that gets all leads without pagination
    const { data } = await api.get('/leads?limit=100'); 
    setLeads(data.leads);
  };

  useEffect(() => {
    fetchTasks();
    fetchLeads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', formData);
      setOpen(false);
      setFormData({ title: '', lead: '', assignedTo: user?._id || '', dueDate: '' });
      fetchTasks();
    } catch (err) {
      alert('Failed to add task');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update task');
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Tasks</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Task</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Lead</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.lead?.name}</TableCell>
                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip label={task.status} color={task.status === 'Done' ? 'success' : 'warning'} size="small" />
                </TableCell>
                <TableCell>
                  {task.status === 'Pending' && task.assignedTo?._id === user?._id && (
                    <Button size="small" variant="contained" color="success" onClick={() => handleUpdateStatus(task._id, 'Done')}>
                      Mark Done
                    </Button>
                  )}
                  {task.assignedTo?._id !== user?._id && (
                    <Typography variant="caption" color="text.secondary">Read Only</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>Add Task</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth required label="Title" sx={{ mb: 2 }} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Lead</InputLabel>
              <Select value={formData.lead} onChange={(e) => setFormData({...formData, lead: e.target.value})} label="Lead" required>
                {leads.map(l => <MenuItem key={l._id} value={l._id}>{l.name}</MenuItem>)}
              </Select>
            </FormControl>

            <TextField fullWidth required type="date" label="Due Date" InputLabelProps={{ shrink: true }} sx={{ mb: 3 }} value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} />
            
            <Button type="submit" variant="contained" fullWidth>Save Task</Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Tasks;
