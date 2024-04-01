import React from 'react';
import { Button, Chip, Stack } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile } from '../api/users.requests';
import { Link, useNavigate } from 'react-router-dom';
import { removeAuthToken } from '../api/client';

const Header: React.FC = () => {
  const {
    data: profile,
    isFetching,
    error,
  } = useQuery({ queryKey: ['profile'], queryFn: getProfile });

  const navigate = useNavigate();
  const qClient = useQueryClient();

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
    qClient.removeQueries();
  };

  return (
    <Stack
      direction="row"
      useFlexGap
      spacing={{ xs: 2 }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        visibility: isFetching || error ? 'hidden' : '',
      }}
    >
      <Chip color="primary" label={profile?.username} />
      {profile?.isAdmin && <Link to="/management">Management</Link>}
      <Link to="/">Articles</Link>
      <Button
        sx={{ ml: 'auto' }}
        variant="outlined"
        color="error"
        size="small"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Stack>
  );
};

export default Header;
