import React, { ReactNode, useEffect } from 'react';
import { AuthPage } from './pages/auth/auth.page';
import { Loader } from './ui/loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setLoader } from './redux/loaderSlice';
import { mainRoutes } from './routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AlertComponent } from './ui/alert.ui';
import { clearAlert } from './redux/errorSlice';
import { ProtectedRoute } from './routes/protected.route';
import { UserEntity } from './common/types/entities/user.entity';

/**
 * The main component of the application that renders the routes and other components.
 * @returns {JSX.Element} - The JSX element of the App component.
 */
function App() {
  const loaderState: boolean = useSelector((state: RootState) => state?.loader.loader);
  const user: UserEntity = useSelector((state: RootState) => state?.user?.user);
  const getRoutes = (): ReactNode => {
    return mainRoutes.map((route) => {
      if (route.public) {
        return <Route path={route.path} element={route.component} key={route.path} />;
      } else {
        return (
          <Route
            path={route.path}
            element={<ProtectedRoute outlet={route.component} key={route.path} />}
          />
        );
      }
    });
  };

  return (
    <div className="App">
      <Routes>
        {getRoutes()}

        <Route path="*" element={<Navigate to={user ? '/home' : '/auth'} />} />
      </Routes>
      {loaderState ? <Loader /> : null}
      <AlertComponent />
    </div>
  );
}

export default App;
