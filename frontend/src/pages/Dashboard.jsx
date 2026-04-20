import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { Group, AccessTime, CheckCircle, Moving } from '@mui/icons-material';
import api from '../api/api';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ 
      opacity: 1, 
      y: [0, -10, 0],
    }}
    transition={{ 
      opacity: { duration: 0.8 },
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }
    }}
    whileHover={{ 
      scale: 1.05, 
      y: -15, 
      rotateX: 10,
      rotateY: -10,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }}
    style={{ perspective: 1000 }}
  >
    <Paper sx={{ 
      p: 3, 
      display: 'flex', 
      alignItems: 'center', 
      borderRadius: 4, 
      overflow: 'visible',
      position: 'relative'
    }}>
      {/* Soft Glow Effect */}
      <Box sx={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '100%', height: '100%',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
        filter: 'blur(20px)',
        zIndex: -1
      }} />

      <Box sx={{ 
        background: `linear-gradient(135deg, ${color}15 0%, transparent 100%)`, 
        p: 2.5, 
        borderRadius: '50%', 
        mr: 3, 
        color: color, 
        display: 'flex',
        border: `1px solid ${color}30`,
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body1" color="text.secondary" fontWeight="600" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" fontWeight="800" sx={{ color: 'text.primary' }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  </motion.div>
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
          <StatCard title="Total Leads" value={stats.totalLeads} icon={<Group fontSize="large" />} color="#00F0FF" delay={0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Qualified Leads" value={stats.qualifiedLeads} icon={<Moving fontSize="large" />} color="#80F8FF" delay={0.2} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Tasks Due Today" value={stats.tasksDueToday} icon={<AccessTime fontSize="large" />} color="#FF0055" delay={0.4} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Completed Tasks" value={stats.completedTasks} icon={<CheckCircle fontSize="large" />} color="#FF80AB" delay={0.6} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
