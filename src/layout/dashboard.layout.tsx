import React, { ReactNode } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import bg from '../assets/bg.png';
import { NavBar } from '../ui/navBar.ui';

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
    maxHeight: '100vh',
    flex: 1,
    overflow: 'auto'
  };
  return (
    <Container fluid style={layoutStyle} className={`nopadding no-gap d-flex flex-column `}>
      <NavBar />

      <Col className="d-flex  flex-column justify-content-top">{children}</Col>
    </Container>
  );
};
