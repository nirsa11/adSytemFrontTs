import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { RootState } from '../redux/store';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const cookies = new Cookies();
  const user = useSelector((state: RootState) => state.user);
  const accessToken = cookies.get('accessToken');
  const tokenTime = cookies.get('tokenTime');

  const isUserLoggedIn = user !== null && accessToken !== undefined && tokenTime !== undefined;
  const isTokenValid = isUserLoggedIn && Number(tokenTime) > Date.now();

  return <Route {...rest} element={isTokenValid ? <Component /> : <Navigate to="/auth" />} />;
};

export default ProtectedRoute;
