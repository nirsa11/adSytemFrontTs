import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { InputProps } from "../common/types/interface/ui/inputProps.interface";
import "./style/input.css"; // Import custom CSS file

export const InputComponent: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  

  return (
    <Form.Group as={Row} className="d-flex"> 
     <Form.Label className={focused ? "shrink" : ""} >
        {label}
      </Form.Label> 
      <Col sm={8}>
        <Form.Control
        
          name= { name}
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`borderless ${focused ? "focused" : ""}`}
        />

        {/* Add error validation element here */}
      </Col>
    </Form.Group>
  );
};
