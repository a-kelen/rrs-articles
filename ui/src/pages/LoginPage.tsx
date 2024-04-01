import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Fade,
  Box,
} from '@mui/material';
import { loginUser } from '../api/users.requests';
import { useNavigate, Link } from 'react-router-dom';
import { setAuthToken } from '../api/client';

interface LoginFormInput {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { accessToken } = data;
      localStorage.setItem('token', accessToken);
      setAuthToken(accessToken);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      setErrorMessage('Invalid username or password');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {showAlert && (
          <Fade in={showAlert} mountOnEnter unmountOnExit>
            <Alert
              severity="error"
              onClose={() => setShowAlert(false)}
              sx={{ marginBottom: '1rem' }}
            >
              {errorMessage}
            </Alert>
          </Fade>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body1">
            Don't have an account?{' '}
            <Link to="/register" color="primary">
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
