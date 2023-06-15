import React, { ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { RootState } from '../redux/store';

export type ProtectedRouteProps = {
  outlet: JSX.Element;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ outlet }) => {
  const cookies = new Cookies();
  const user = useSelector((state: RootState) => state.user.user);
  const accessToken = cookies.get('accessToken');
  const tokenTime = cookies.get('tokenTime');

  const isUserLoggedIn = user !== null && accessToken !== undefined && tokenTime !== undefined;
  const isTokenValid = isUserLoggedIn && Number(tokenTime) > Date.now();

  if (isUserLoggedIn) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: '/auth' }} />;
  }
};
