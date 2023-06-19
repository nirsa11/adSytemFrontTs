import React, { ReactNode, useEffect, useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './auth.css';

interface LayoutProps {
  backgroundImage: string;
  children: ReactNode;
  shrink: boolean;
}

/**
 * A layout component that displays a background image and wraps its children in a container.
 * @param {LayoutProps} backgroundImage - The URL of the background image to display.
 * @param {ReactNode} children - The child components to wrap in the layout.
 * @param {boolean} shrink - Whether or not to shrink the layout.
 * @returns A React component that displays a background image and wraps its children in a container.
 */
export const AuthLayout: React.FC<LayoutProps> = ({ backgroundImage, children, shrink }) => {
  const layoutStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
    maxHeight: '100vh'
  };

  const contentWrapperStyle = {
    width: '100%',
    padding: '0 20px' // Adjust the padding as needed
  };

  return (
    <Container fluid>
      <Row className="bg-primary nopadding" style={{ border: 'none !important' }}>
        <Col
          sm={12}
          style={layoutStyle}
          className={`bg-dark nopadding  d-flex justify-content-end col-transition ${
            shrink ? ' grow' : ''
          }`}
        >
          <Col
            sm={shrink ? 7 : 5}
            className={`h-100 nopadding col-transition ${shrink ? ' grow' : ''}`}
            style={{ overflow: 'auto' }}
          >
            <div style={contentWrapperStyle}>{children}</div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
