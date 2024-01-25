import { AppBar, Toolbar, Typography, Button } from '@mui/material';


const UserNavBar = () => {
  return (
    <AppBar position="static" sx={{ width: '100%', maxWidth: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Toolbar>
    
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Recipe Sharing App
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">My Profile</Button>
        <Button color="inherit">Upload Recipe</Button>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavBar;
