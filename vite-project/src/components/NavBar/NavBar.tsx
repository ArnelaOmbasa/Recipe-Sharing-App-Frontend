import { AppBar, Tabs, Tab, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; 
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Navbar = () => {

  const dispatch = useDispatch();
  
  const { userToken, userType } = useSelector((state: RootState) => (state as RootState).auth);

  return (
    <AppBar position="fixed" className="AppBar-root">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0 }}>
          CookeryCommunity
        </Typography>
        <Typography sx={{ flexGrow: 1 }} />

        {userToken ? (
          <Tabs>
            <Tab label="Home" component={Link} to="/home" style={{ color: 'inherit' }}/>
            {userType === 'ADMIN' && <Tab label="Admin" component={Link} to="/admin" style={{ color: 'inherit' }}/>}
            <Tab label="My Profile" component={Link} to="/profile" style={{ color: 'inherit' }}/>
            <Tab label="Upload Recipe" component={Link} to="/upload" style={{ color: 'inherit' }}/>
            <Tab label="Logout" component={Link} to="/" style={{ color: 'inherit' }} onClick={() => dispatch(logout())}
/>
          </Tabs>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
