import { NavTabsProps } from '../../common/types/interface/ui/navTabsProps.interface';
import { AuthLayout } from '../../layout/auth.layout';
import { NavTabs } from '../../ui/navTab.ui';
import { LoginPage } from './components/login.auth';
import React, { ElementType, useEffect, useState } from 'react';
import { RegisterPage } from './components/register.auth';
import { Col, Container, Row } from 'react-bootstrap';
import backgroundImage from './../../assets/bg.png';
import { ResetPasswordPage } from './components/resetPassword.auth';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { checkTokenApi } from '../../common/services/api.service';
import { UserEntity } from '../../common/types/entities/user.entity';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { createBrowserHistory } from 'history';

type NavTabKey = 'login' | 'register';

let navTabsArray: NavTabsProps[] = [
  {
    isDefault: true,
    key: 'login',
    title: 'התחברות',
    Component: <LoginPage />,
    shrink: true
  },
  {
    key: 'register',
    title: 'הרשמה',
    Component: <RegisterPage />,
    shrink: false
  }
];

export const AuthPage = (): JSX.Element => {
  const [shrink, setShrink] = useState<boolean>(false);
  const [tabs, setTabs] = useState<NavTabsProps[]>(navTabsArray);
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get('token'));
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const user: UserEntity = useSelector((state: RootState) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      checkTokenApi({ token })
        .then((response) => {
          if (response) {
            setResetPassword(true);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <>
      <AuthLayout backgroundImage={backgroundImage} shrink={shrink}>
        <Container className="mt-5" fluid>
          <Row variant={Col} md={12} sm={12} lg={12}>
            {token ? (
              <ResetPasswordPage setToken={setToken} />
            ) : (
              <NavTabs tabsProps={tabs} setShrink={setShrink} />
            )}
          </Row>
        </Container>
      </AuthLayout>
    </>
  );
};
