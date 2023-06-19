import React, { ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { RootState } from '../redux/store';

/**
 * A protected route component that checks if the user is logged in and has a valid access token.
 * @param {ProtectedRouteProps} outlet - The component to render if the user is logged in and has a valid access token.
 * @returns {JSX.Element} - The component to render if the user is not logged in or does not have a valid access token.
 */
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
