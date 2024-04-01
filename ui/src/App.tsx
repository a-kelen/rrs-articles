import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import {
  Backdrop,
  CircularProgress,
  Container,
  ThemeProvider,
} from '@mui/material';
import theme from './theme';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleManagementPage from './pages/ArticleManagementPage';
import Header from './components/Header';
import AuthRoute from './components/AuthRoute';
import { getProfile } from './api/users.requests';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([{ path: '*', Component: Root }]);

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const {
    data: profile,
    isFetching,
    error,
  } = useQuery({ queryKey: ['profile'], queryFn: getProfile, retry: 0 });

  if (isFetching) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <AuthRoute to="/login" isAuthenticated={!!profile && !error}>
            <ArticlesPage />
          </AuthRoute>
        }
      />
      <Route
        path="/management"
        element={
          <AuthRoute
            to="/"
            isAuthenticated={!error && !!profile && profile.isAdmin}
          >
            <ArticleManagementPage />
          </AuthRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
