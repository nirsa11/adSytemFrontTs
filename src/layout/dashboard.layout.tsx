import React, { ReactNode } from 'react';
import { Container, Col } from 'react-bootstrap';
import bg from '../assets/bg.png';
import { NavBar } from '../ui/navBar.ui';
import './dashboard.css';

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
export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const layoutStyle = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
    maxHeight: '100vh'
  };
  return (
    <Container fluid style={layoutStyle} className={`nopadding no-gap d-flex flex-column  `}>
      <Col>
        <NavBar />
      </Col>
      <Col className="d-flex  flex-column justify-content-center align-items-center">
        {children}
      </Col>
    </Container>
  );
};
