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
import { RouteProps } from './routes/';
/**
 * The main component of the application that renders the routes and other components.
 * @returns {JSX.Element} - The JSX element of the App component.
 */
function App() {
  const loaderState: boolean = useSelector((state: RootState) => state?.loader.loader);
  const user: UserEntity = useSelector((state: RootState) => state?.user?.user);

  const getRoutes = (): React.ReactNode => {
    const renderRoutes = (routes: RouteProps[]): React.ReactNode => {
      return routes.map((route) => {
        if (route.nestedRoutes) {
          return (
            <Route
              path={route.path}
              element={
                route.public ? (
                  route.component
                ) : (
                  <ProtectedRoute outlet={route.component} key={route.path} />
                )
              }
              key={route.path}
            >
              {renderRoutes(route.nestedRoutes)}
            </Route>
          );
        } else {
          return (
            <Route
              path={route.path}
              element={
                route.public ? (
                  route.component
                ) : (
                  <ProtectedRoute outlet={route.component} key={route.path} />
                )
              }
              key={route.path}
            />
          );
        }
      });
    };
    console.log(renderRoutes(mainRoutes));
    return renderRoutes(mainRoutes);
  };

  return (
    <div className="App nopadding">
      <Routes>
        {getRoutes()}
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/auth'} />} />
      </Routes>
      {loaderState ? <Loader /> : null}
      <AlertComponent />
    </div>
  );
}

export default App;
