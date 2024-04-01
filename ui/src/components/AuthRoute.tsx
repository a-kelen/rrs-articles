import React from 'react';
import { Navigate } from 'react-router-dom';

export interface AuthRouteProps {
  isAuthenticated: boolean;
  children: any;
  to: string;
}

const AuthRoute = ({ isAuthenticated, children, to }: AuthRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={to} replace />;
  }

  return children;
};

export default AuthRoute;
