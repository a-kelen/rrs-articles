import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Fade,
  Alert,
} from '@mui/material';
import { registerUser } from '../api/users.requests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../api/client';
import { AxiosError } from 'axios';

type RegisterFormInput = {
  username: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInput>();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const { accessToken } = data;
      localStorage.setItem('token', accessToken);
      setAuthToken(accessToken);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error: any) {
      const axiosError = error as AxiosError;
      if (!!axiosError) {
        const { message } = axiosError.response?.data as any;
        setErrorMessage(message);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setErrorMessage('');
        }, 5000);
      }
      console.log(error);
    }
  };

  const password = watch('password');

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
          Register
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
            {...register('username', { required: 'Username is required' })}
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register('password', { required: 'Password is required' })}
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            {...register('confirmPassword', {
              validate: (value) =>
                value === password || 'The passwords do not match',
            })}
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <FormControlLabel
            control={<Checkbox {...register('isAdmin')} color="primary" />}
            label="As Admin"
          />
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
