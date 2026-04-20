import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const CompanyDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/companies/${id}`);
        setData(res.data);
      } catch (error) {
        console.error('Failed to load company detail', error);
      }
    };
    fetchDetail();
  }, [id]);

  if (!data) return <Typography>Loading...</Typography>;

  const { company, leads } = data;

  return (
    <Box maxWidth="md">
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>{company.name}</Typography>
        <Typography color="text.secondary" gutterBottom>Industry: {company.industry || 'N/A'}</Typography>
        <Typography color="text.secondary">Location: {company.location || 'N/A'}</Typography>
      </Paper>

      <Typography variant="h6" fontWeight="bold" mb={2}>Associated Leads</Typography>
      <Paper>
        {leads.length > 0 ? (
          <List>
            {leads.map((lead, index) => (
              <React.Fragment key={lead._id}>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary={lead.name} secondary={lead.email} />
                  <Chip label={lead.status} size="small" />
                </ListItem>
                {index < leads.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography p={3} textAlign="center" color="text.secondary">No leads associated with this company.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CompanyDetail;
