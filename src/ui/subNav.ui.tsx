import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Col } from 'react-bootstrap';
import LogoOne from '../assets/logo-login-1.png';
import LogoTwo from '../assets/logo-login-2.png';
import styles from './style/navbar.module.css';
import { ArrowRight } from 'react-bootstrap-icons';
import { NavRoute, RouteProps, mainRoutes } from '../routes';
import { AddCampaign } from '../pages/dashboard/components/addCampaign';
import { MyCampaigns } from '../pages/dashboard/components/myCampaigns';

let navRoutes: RouteProps[] = [
  {
    path: '/dashboard/',
    name: 'הוסף קמפיין',
    public: false,
    component: <AddCampaign />
  },
  {
    path: '/dashboard/my-campaigns',
    name: 'הקמפיינים שלי',
    public: false,
    component: <MyCampaigns />
  }
];

export const SubNavBar = () => {
  const location = useLocation();

  return (
    <Navbar
      expand="lg"
      as={Col}
      md={9}
      className={`${styles.navbarGreenBorder} bg-transparent nopadding bg-danger`}
    >
      <Nav className="justify-content-center align-items-center" as={Col} md={12}>
        {navRoutes.map((route, index) => (
          <React.Fragment key={index}>
            <Nav.Link
              as={Link}
              to={route.path}
              className={
                location.pathname + '/' === route.path
                  ? `${styles.active} p-2`
                  : `${styles.navLink} p-2`
              }
            >
              {route.name}
            </Nav.Link>
            {index !== navRoutes.length - 1 && (
              <span className="mx-2 align-self-center text-light">|</span>
            )}
          </React.Fragment>
        ))}
      </Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse as={Col} id="responsive-navbar-nav">
        <Nav className="p-3 justify-content-end" as={Col} col={12}></Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};