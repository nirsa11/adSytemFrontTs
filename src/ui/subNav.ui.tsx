import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import styles from'../assets/scss/ui/_navbar.module.scss';
import {  RouteProps } from '../routes';
import { AddCampaign } from '../pages/dashboard/components/add.campaign';
import { MyCampaigns } from '../pages/dashboard/components/list.campaigns';

let navRoutes: RouteProps[] = [
  {
    path: '/dashboard/',
    name: 'הקמפיינים שלי',
    public: false,
    component: <MyCampaigns />
  },
  {
    path: '/dashboard/add-campaign',
    name: 'הוסף קמפיין',
    public: false,
    component: <AddCampaign />
  }
];

/**
 * A sub-navigation bar component that displays a list of links to different routes.
 * @returns {JSX.Element} - The sub-navigation bar component.
 */
export const SubNavBar = (): JSX.Element => {
  const location = useLocation();

  return (
    <Navbar
      as={Col}
      md={10}
      className={`subnav-ui ${styles.navbarGreenBorder} bg-transparent nopadding bg-danger bg-dark justify-content-center mx-auto`}
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
