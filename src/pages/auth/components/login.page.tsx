import React from "react";
import "../auth.css";
import { FormComponent } from "../../../ui/form.ui";
import { InputProps } from "../../../common/types/interface/ui/inputProps.interface";
import { InputComponent } from "../../../ui/input.ui";
import { Col, Form, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const inputs: Partial<InputProps>[] = [
  {
    name: "email",
    label: "מייל",
    type: "email",
    placeholder: "הכנס מייל",
  },
  {
    name: "password",
    label: "סיסמא",
    type: "password",
    placeholder: "הכנס סיסמא",
  },
];

export const LoginPage = () => {
  return (
    <div>
      <FormComponent inputs={inputs as InputProps[] }   >

      <Row className="mt-5" >
        <div className="d-flex  flex-row justify-content-center ">
        <Form.Check // prettier-ignore   
          type={"checkbox"}
          label="זכור אותי"
          />
           <a className='link'> שכחתי סיסמא</a>
          </div>
      
      </Row>
      </FormComponent>
    </div>
  );
};
