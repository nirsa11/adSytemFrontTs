import React from "react";
import "../auth.css";
import { FormComponent } from "../../../ui/form.ui";
import { InputProps } from "../../../common/types/interface/ui/inputProps.interface";

const inputs: InputProps[] = [
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
      <FormComponent inputs={inputs} />
    </div>
  );
};
