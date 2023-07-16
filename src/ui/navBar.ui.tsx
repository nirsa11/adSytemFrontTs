import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Col, NavDropdown } from 'react-bootstrap';
import { navRoutes } from '../routes';
import { setUser } from '../redux/userSlice';
import { removeCookies } from '../common/utils';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import LogoOne from '../assets/img/logo-login-1.png';
import LogoTwo from '../assets/img/logo-login-2.png';
import styles from'../assets/scss/ui/_navbar.module.scss';

export const NavBar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const userName: string = useSelector((state: RootState) => state?.user?.user.name);
  const [selectedDropDown, setSelectedDropDown] = useState(userName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Adjust the breakpoint according to your needs
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logOut = () => {
    dispatch(setUser(null));
    removeCookies('accessToken');
    removeCookies('tokenTime');

    navigate('/auth');
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      fixed="top"
      expand="lg"
      className={`navbar-ui ${styles.navbarGreenBorder} ${isMobile ? '' : 'bg-transparent'} mx-auto`}
      as={Col}
      md={10}
      style={{ position: 'relative', minWidth: `${isMobile ? '100%' : ''}` }}
    >
      <Navbar.Brand className="p-2">
        <img src={LogoOne} alt="Logo 1" className="logo-image" width="80px" />
        <img src={LogoTwo} alt="Logo 2" className="logo-image" width="80px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse as={Col} id="responsive-navbar-nav">
        <Nav className="p-3 justify-content-end" as={Col} col={12}>
          {navRoutes.map((route, index) => (
            <Nav.Link
              onClick={() => setSelectedDropDown(userName)}
              key={index}
              as={Link}
              to={route.path}
              className={
                location.pathname === route.path ? `${styles.active} p-2` : `${styles.navLink} p-2`
              }
            >
              {route.name}
            </Nav.Link>
          ))}

          <NavDropdown
            title={selectedDropDown}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to={'/dashboard/edit-profile'}
              onClick={() => setSelectedDropDown('פרופיל')}
            >
              פרופיל
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={'/auth'} onClick={logOut}>
              יציאה מהחשבון
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};