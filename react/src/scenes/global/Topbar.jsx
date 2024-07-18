import React, { useContext, useState } from 'react';
import { Button, Popover, Typography, Box, IconButton, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { jwtDecode } from "jwt-decode"
import { ColorModeContext, tokens } from '../../theme';
import { useNavigate } from "react-router-dom";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('');
  const [admin, setAdmin] = useState(false);
  const handleButtonLogout = () => {
    navigate('/login');   // navigates to NIH Dashboard
  };
  // Decode the token to get the username
  React.useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.name);
      setAdmin(decodedToken.isAdmin);
      console.log(decodedToken);
      console.log(decodedToken.isAdmin);
    }
  }, [token]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box display="flex" justifyContent="space-between" p={2} backgroundColor=''>
      <Box>
        {/* display="flex"
         backgroundColor={colors.primary[400]}
         borderRadius="3px"
       
         <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
         <IconButton type="button" sx={{ p: 1 }}>
           <SearchIcon />
         </IconButton> */}
      </Box>
      <Box display="flex">


        {token && (
          <>
            <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
              <PersonOutlinedIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box sx={{ backgroundColor: 'white', color: 'black', p: 2 }}>
                <Typography>Logged in as: <b>{username} {admin ? "(Admin)" : "Not an admin"}</b></Typography>
                <Button onClick={(handleButtonLogout) => {
                  localStorage.removeItem('token');
                  handleClose();

                  window.location.reload(); // Reload the page to reflect logout
                }} sx={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: 'darkred', // Darker shade for hover effect
                  },
                }}
                >
                  Logout
                </Button>
              </Box>
            </Popover>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;