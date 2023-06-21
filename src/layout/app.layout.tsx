import React, { ReactNode, useEffect, useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './auth.css';
import bg from '../assets/bg.png';
import PiChatIcon2 from '../assets/logo-login-2.png';

interface LayoutProps {
  children: ReactNode;
}

/**
 * A layout component that displays a background image and wraps its children in a container.
 * @param {LayoutProps} backgroundImage - The URL of the background image to display.
 * @param {ReactNode} children - The child components to wrap in the layout.
 * @param {boolean} shrink - Whether or not to shrink the layout.
 * @returns A React component that displays a background image and wraps its children in a container.
 */
export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const layoutStyle = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
    maxHeight: '100vh'
  };

  const contentWrapperStyle = {
    width: '100%',
    padding: '20px',
    margin: '1rem 2rem 0 0',
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <Container fluid>
      <Row className="bg-primary nopadding">
        <Col sm={12} md={12} style={layoutStyle} className={`nopadding  d-flex  col-transition `}>
          <div style={contentWrapperStyle}>{children}</div>
        </Col>
      </Row>
    </Container>
  );
};
