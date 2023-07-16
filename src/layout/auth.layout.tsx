import React, { ReactNode, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PiChatIcon1 from '../assets/img/logo-login-1.png';
import PiChatIcon2 from '../assets/img/logo-login-2.png';
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
    minHeight: '100vh',
    maxHeight: '100vh'
  };
  // const contentWrapperStyle = {
    // width: '100%',
    // padding: '20px',
    // margin: '1rem 2rem 0 0',
    // display: 'flex',
    // justifyContent: 'center'
  // };
  return (
    <Container fluid className="auth-layout nopadding">
      <Row className="nopadding">
        <Col
          sm={12}
          style={layoutStyle}
          className={`nopadding d-flex justify-content-end col-transition ${shrink ? 'grow' : ''}`}
        >
          {window.innerWidth > 768 && (
            <div className="right-col d-flex justify-content-center w-100 h-100 align-items-center ">
              <Col md={6} className="d-flex justify-content-end p-3">
                <img src={PiChatIcon2} alt="My Image" height={'130px'} />
              </Col>
              <Col md={6} className="d-flex justify-content-start mt-4">
                <img src={PiChatIcon1} alt="My Image" className="image-animation" />
              </Col>
            </div>
          )}
          <Col
            sm={shrink ? 7 : 5}
            md={shrink ? 7 : 5}
            className={`left-col h-100 nopadding col-transition ${shrink ? 'grow' : ''}`}
          >
            <div className="parent nopadding">
              {children}
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};