import React, { useContext, useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, IconButton, Button, CssBaseline } from '@mui/material';
import { Dashboard as DashboardIcon, People, Business, Assignment, Menu } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Leads', icon: <People />, path: '/leads' },
    { text: 'Companies', icon: <Business />, path: '/companies' },
    { text: 'Tasks', icon: <Assignment />, path: '/tasks' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          MINI CRM
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            selected={location.pathname === item.path}
            sx={{
              mx: 1,
              borderRadius: 2,
              mb: 0.5,
              ...(location.pathname === item.path && {
                backgroundColor: 'primary.main',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                   content: '""',
                   position: 'absolute',
                   top: 0, left: 0, width: '100%', height: '100%',
                   background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                },
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }),
              ...!(location.pathname === item.path) && {
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                }
              }
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'inherit' : 'text.secondary' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: location.pathname === item.path ? 700 : 500 
              }} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0} sx={{ 
        width: { sm: `calc(100% - ${drawerWidth}px)` }, 
        ml: { sm: `${drawerWidth}px` }, 
        backgroundColor: 'rgba(255, 255, 255, 0.75)', 
        backdropFilter: 'blur(16px)',
        color: 'text.primary',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <Menu />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body1" sx={{ mr: 2, fontWeight: 500 }}>
            {user?.name}
          </Typography>
          <Button color="inherit" onClick={handleLogout} variant="outlined" size="small">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh' }}>
        <Toolbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Layout;
