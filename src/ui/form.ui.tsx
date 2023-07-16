import Form from "react-bootstrap/Form";
import React from "react";
import { InputComponent } from "./input.ui";
import { FormProps } from "../common/types/interface/ui/inputProps.interface";
import { Col, Row } from "react-bootstrap";
export const FormComponent: React.FC<FormProps> = ({ inputs, children, double }) => {

  const renderSingleInput = (): JSX.Element | JSX.Element[] => {
    return inputs.map((input, index) => {
      return (

        <InputComponent
          key={input.name}
          name={input.name}
          label={input.label}
          type={input.type}
          placeholder={input.placeholder}
          value={input.value}
          handleChange={input.handleChange}
        />

      );
    });
  }

  const renderDoubleInput = (): JSX.Element | JSX.Element[] => {

    return inputs.map((input, index) => {
      return (
        <Col className="col-md-6 mx-auto gap-3">
          <InputComponent
            key={input.name}
            name={input.name}
            label={input.label}
            type={input.type}
            placeholder={input.placeholder}
            value={input.value}
            handleChange={input.handleChange}
          />
        </Col>
      );
    });

  }

  return (
    <Form className="form-ui d-flex flex-column mt-5 ">
      {
        double
          ?
          <Row className="col-md-12 align-items-stretch">
            {renderDoubleInput()}
          </Row>
          :
          <Row className="col-md-12 mx-auto gap-5">
            {renderSingleInput()}
          </Row>
      }
      <div className="d-flex col-8 row jusitfy-content-center">
        {children}
      </div>
    </Form>
  );
};