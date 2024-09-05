// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#3c3163' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" style={{ marginRight: 20 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          EduLink
        </Typography>
        <Button color="inherit" component={Link} to="/share-papers">
          Share Papers
        </Button>
        <Button color="inherit" component={Link} to="/upload">
          Upload Papers
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
