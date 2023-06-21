import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Col } from 'react-bootstrap';
import LogoOne from '../assets/logo-login-1.png';
import LogoTwo from '../assets/logo-login-2.png';
import styles from './style/navbar.module.css';

import { ArrowRight } from 'react-bootstrap-icons';

import { NavRoute } from '../routes';

export const SubNavBar = () => {
  const location = useLocation();

  return (
    <Navbar
      bg="dark"
      variant="dark"
      className={`${styles.navbarGreenBorder} bg-transparent`}
      as={Container}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse as={Col} id="responsive-navbar-nav">
        <Nav className="p-3 justify-content-end" as={Col} col={12}></Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
