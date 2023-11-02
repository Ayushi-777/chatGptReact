


import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../components/chatbot';
import brainsparkImage from '../images/brainspark.png';
import { Menu, MenuItem, Avatar } from '@mui/material';
import '../components/Home.css';

function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem('user');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear session, reset authentication status, etc.
    localStorage.removeItem('user');
    handleCloseMenu();
    navigate('/login'); // Redirect to the login page after logout
  };

  const getUserInitials = (name) => {
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0)).join('').toUpperCase();
    return initials;
  };

  return (
    <div className="Chatbot">
      <div className="menu-bar">
        <div className="menu-item username">
          {/* Welcome, {username}! */}
        </div>
        <Avatar onClick={handleOpenMenu} className="avatar">
          {getUserInitials(username)}
        </Avatar>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem >{username}</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          {/* Add more menu items as needed */}
        </Menu>
      </div>

      <img src={brainsparkImage} alt="Chatbot" className="logo" />

      <h1 style={{ paddingLeft: '315px', marginBottom: '-15px', color: '#fff' }}>
        Incedo GenAI TechAssist
      </h1>
      <ChatBot />
    </div>
  );
}

export default Home;
