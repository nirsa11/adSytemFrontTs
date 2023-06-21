import React, { ReactNode, useEffect, useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import './auth.css';
import PiChatIcon1 from '../assets/logo-login-1.png';
import PiChatIcon2 from '../assets/logo-login-2.png';

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    padding: '20px',
    margin: '1rem 2rem 0 0',
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <Container fluid>
      <Row className="nopadding" style={{ border: 'none !important' }}>
        <Col
          sm={12}
          style={layoutStyle}
          className={`bg-dark nopadding  d-flex justify-content-end col-transition ${
            shrink ? ' grow' : ''
          }`}
        >
          {window.innerWidth > 768 ? (
            <div className="d-flex justify-content-center w-100 h-100 align-items-center">
              <Col md={shrink ? 3 : 2}>
                <img src={PiChatIcon2} alt="My Image" height={'130px'} />
              </Col>
              <Col md={shrink ? 3 : 2} className="mt-4">
                <img src={PiChatIcon1} alt="My Image" className="image-animation" />
              </Col>
            </div>
          ) : null}

          <Col
            sm={shrink ? 7 : 5}
            className={`h-100 nopadding col-transition ${shrink ? ' grow' : ''}`}
            style={{ overflow: 'auto' }}
          >
            <div className="parent" style={contentWrapperStyle}>
              {children}
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
