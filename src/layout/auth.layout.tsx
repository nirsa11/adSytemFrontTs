import React, { ReactNode, useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "./auth.css";

interface LayoutProps {
  backgroundImage: string;
  children: ReactNode;
  shrink: boolean;
}

export const AuthLayout: React.FC<LayoutProps> = ({
  backgroundImage,
  children,
  shrink,
}) => {
  const [smValue, setSmValue] = useState(5);
  const layoutStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    maxHeight: "100vh",
  };

  return (
    <Container fluid>
      <Row>
        <Col
          sm={12}
          style={layoutStyle}
          className={`col-transition ${shrink ? " grow" : ""}`}
        >
          <Col
            sm={shrink ? 7 : 5}
            className={`col-transition ${shrink ? " grow" : ""}`}
          >
            <div className="layout-children ">{children}</div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
