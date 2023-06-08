import { NavTabsProps } from "../../common/types/interface/ui/navTabsProps.interface";
import { AuthLayout } from "../../layout/auth.layout";
import { NavTabs } from "../../ui/navTab.ui";
import { LoginPage } from "./components/login.page";
import React, { useEffect, useState } from "react";
import { RegisterPage } from "./components/register.page";
import { Col, Container, Row } from "react-bootstrap";

const navTabsArray: NavTabsProps[] = [
  {
    isDefault: true,
    key: "login",
    title: "התחברות",
    Component: <LoginPage />,
    shrink: true,
  },
  {
    key: "register",
    title: "הרשמה",
    Component: <RegisterPage />,
    shrink: false,
  },
];

export const AuthPage = (): React.JSX.Element => {
  const [shrink, setShrink] = useState<boolean>(false);

  return (
    <>
      <AuthLayout
        backgroundImage="https://picsum.photos/200/300"
        shrink={shrink}
      >
        <Container className="mt-5" fluid>
          <Row variant={Col} md={12} sm={12} lg={12} >
            <NavTabs tabsProps={navTabsArray} setShrink={setShrink} />
          </Row>
        </Container>
      </AuthLayout>
    </>
  );
};
