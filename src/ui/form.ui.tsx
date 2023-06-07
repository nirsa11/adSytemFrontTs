import Form from "react-bootstrap/Form";
import React from "react";
import { InputComponent } from "./input.ui";
import { FormProps } from "../common/types/interface/ui/inputProps.interface";

export const FormComponent: React.FC<FormProps> = ({ inputs }) => {
  return (
    <Form className="d-flex gap-3 flex-column">
      {inputs.map((input) => (
        <InputComponent
          key={input.name}
          name={input.name}
          label={input.label}
          type={input.type}
          placeholder={input.placeholder}
        />
      ))}
    </Form>
  );
};
