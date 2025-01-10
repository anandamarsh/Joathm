import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, CssBaseline, Divider, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AssistantIcon from '@mui/icons-material/Assistant';
import Chatbot from './Chatbot';

const drawerWidth = 250;
const closedDrawerWidth = 64;
const headerColor = '#3f51b5';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Joathm
          </Typography>
          <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? drawerWidth : closedDrawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          [`& .MuiDrawer-paper`]: {
            width: drawerOpen ? drawerWidth : closedDrawerWidth,
            transition: (theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            top: '64px',
          },
        }}
      >
        <List>
          <ListItem onClick={toggleChatbot} sx={{ minHeight: '64px', cursor: 'pointer', '&:hover': { backgroundColor: '#f0f0f0' } }}>
            <ListItemIcon>
              <AssistantIcon style={{ color: headerColor }} />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Course Assistant" />}
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main style={{ flexGrow: 1, padding: '80px 24px 24px', marginLeft: drawerOpen ? drawerWidth : closedDrawerWidth, transition: 'margin-left 0.3s' }}>
        {children}
      </main>
      {chatbotVisible && <Chatbot onClose={toggleChatbot} title="Course Assistant" headerColor={headerColor} />}
    </div>
  );
};

export default Layout;