import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

export default function DrawerMUI ({logged, setLogged}) {
  const [open, setOpen ] = useState(false);

  const handleOpen = () => setOpen(true); 
  const handleClose = () => setOpen(false);
  const handleLogout = () => {
    handleClose()
    sessionStorage.removeItem('logged')
    setLogged(false)
    window.location.replace('/')
  }

  return (
    <Box>
      <IconButton onClick={ handleOpen }><MenuIcon color="secondary" /></IconButton>
      <Drawer anchor='top' open={open} onClick={handleClose}
        PaperProps={{
          sx: {backgroundColor: "primary.main"}
        }}>
        <List sx={{margin: 3}}>
          <ListItem button component={Link} to="favorites">
            <ListItemText primary='Favorites' primaryTypographyProps={{ color: "secondary" }} />
          </ListItem>
          <ListItem button component={Link} to="players">
            <ListItemText primary='All players' primaryTypographyProps={{color: "secondary"}} />
          </ListItem>
          <ListItem button component={Link} to="tournaments">
            <ListItemText primary='Tournaments' primaryTypographyProps={{color: "secondary"}} />
          </ListItem><br />
          {logged 
            ? <ListItem button onClick={handleLogout}>
                <ListItemText primary='Logout' primaryTypographyProps={{ color: "secondary" }} />
              </ListItem>
            : <>
              <ListItem button component={Link} to="login">
                <ListItemText primary='Login' primaryTypographyProps={{color: "secondary"}} />
              </ListItem>
              <ListItem button component={Link} to="register">
                <ListItemText primary='Register' primaryTypographyProps={{color: "secondary"}} />
              </ListItem>
              </>
          }
        </List>
      </Drawer>
    </Box>
  );
}