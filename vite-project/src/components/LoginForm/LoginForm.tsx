import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import { LoginFormData } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { login } from '../../store/authSlice';
import { AppDispatch } from '../../store'; 
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
}).required();

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  });

  const { loading, userToken, error } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate()


 useEffect(() => {
  console.log("User Token Updated: ", userToken); 

   if (userToken) {
     navigate('/home')
   }
 }, [navigate, userToken])


  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: LoginFormData) => {
    dispatch(login(data));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper style={{ padding: 20, marginTop: 50 }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
          {error && (
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Unable to log in!</h4>
              <p>{error}</p>
              <hr />
              <p className="mb-0">Something went wrong, please try again.</p>
            </div>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            autoFocus
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register('password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Sign In'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
