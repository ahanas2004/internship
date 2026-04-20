import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Group, AccessTime, CheckCircle, Moving } from '@mui/icons-material';
import api from '../api/api';

const StatCard = ({ title, value, icon, color }) => (
  <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', borderRadius: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
    <Box sx={{ backgroundColor: `${color}15`, p: 2, borderRadius: '50%', mr: 2, color: color }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (!stats) return <Typography>Error loading statistics</Typography>;

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Leads" value={stats.totalLeads} icon={<Group fontSize="large" />} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Qualified Leads" value={stats.qualifiedLeads} icon={<Moving fontSize="large" />} color="#2e7d32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Tasks Due Today" value={stats.tasksDueToday} icon={<AccessTime fontSize="large" />} color="#ed6c02" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Completed Tasks" value={stats.completedTasks} icon={<CheckCircle fontSize="large" />} color="#9c27b0" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
