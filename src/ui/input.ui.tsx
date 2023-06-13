import React, { ReactNode, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { InputProps } from "../common/types/interface/ui/inputProps.interface";
import "./style/input.css"; // Import custom CSS file

export const InputComponent: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  register,
  errors,
  handleChange,
  value,
  defaultValue
})   => {
  const [focused, setFocused] = useState<boolean>(false);
  const handleFocus = (event) => {
    setFocused(true);
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

  };

  const handleBlur = (event) => {
    setFocused(false);
  };





  return (
    <Form.Group as={Row} className="d-flex"> 
     <Form.Label className={focused ? "shrink" : "align-self-end "} >
        {label}
      </Form.Label> 
      <Col sm={8}>
        <Form.Control
          type={type}
          key = {name}
          {...register(name)}
          name= { name}
          className={`borderless ${focused ? "focused" : ""}`}
          defaultValue={defaultValue}
          value = {value}
          placeholder = {placeholder}
           onFocus={handleFocus}
           onChange = {handleChange}
          //  onBlur={handleBlur}
          />
        {
          errors && errors[name] ?  (
              <p className="text-danger">{errors[name].message as string}</p> 
          )
          :
          ""
        }
       
      </Col>
    </Form.Group>
  );
};
