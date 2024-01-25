import { useForm, Controller, Resolver } from 'react-hook-form';
import { TextField, Button, Paper, Container, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import * as yup from 'yup';
import { UserRole } from '../../utils/types'; 
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/authSlice'; 
import { RootState } from '../../store';
import { UnknownAction } from '@reduxjs/toolkit';
import { RegisterFormData } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Typography } from '@mui/material';

const schema = yup.object({
  username: yup.string().min(6, 'Username must be at least 6 characters long').max(20, 'Username cannot be more than 20 characters long').required('Username is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  role: yup.mixed().oneOf(['ADMIN', 'USER'], 'Invalid role').required('Role is required')
}).required();

const RegisterForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(schema) as unknown as Resolver<RegisterFormData>
  });

  const dispatch = useDispatch();
  const { loading, userToken, error, success} = useSelector((state: RootState) => state.auth); 
  const onSubmit = (data: RegisterFormData) => {
    dispatch(registerUser(data) as unknown as UnknownAction); 
  };

  const navigate = useNavigate()
useEffect(() => {
   if (success) navigate('/login')
   if (userToken) navigate('/home')
}, [navigate, userToken, success])

  

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Paper elevation={6} style={{ padding: 20, width: '100%', maxWidth: 400 }}>
          {error && (
            <div style={{ color: 'red', margin: '10px 0' }}>
              Unable to register. {error}
            </div>
          )}
            <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register('username')}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />
            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel id="role-label">Role</InputLabel>
              <Controller
                name="role"
                control={control}
                defaultValue="USER"
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="role-label"
                    label="Role"
                  >
                    {(['ADMIN', 'USER'] as UserRole[]).map((role) => (
                      <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.role?.message}</FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20 }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Register'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterForm;
