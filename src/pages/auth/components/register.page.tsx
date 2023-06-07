import { AuthLayout } from "../../../layout/auth.layout";
import React from "react";
import "../auth.css";
import { InputProps } from "../../../common/types/interface/ui/inputProps.interface";
import { FormComponent } from "../../../ui/form.ui";

const inputs: InputProps[] = [
  {
    name: "companyName",
    label: "שם חברה",
    type: "text",
    placeholder: "הכנס מייל",
  },
  {
    name: "buissnessId",
    label: "ח.פ תעודת זהות",
    type: "text",
    placeholder: "הכנס סיסמא",
  },
  {
    name: "nameForTax",
    label: "מייל",
    type: "text",
    placeholder: "הכנס מייל",
  },
  {
    name: "address",
    label: "סיסמא",
    type: "text",
    placeholder: "הכנס סיסמא",
  },
  {
    name: "contactName",
    label: "מייל",
    type: "text",
    placeholder: "הכנס מייל",
  },
  {
    name: "phone",
    label: "מייל",
    type: "tel",
    placeholder: "הכנס מייל",
  },
  {
    name: "email",
    label: "סיסמא",
    type: "email",
    placeholder: "הכנס סיסמא",
  },
  {
    name: "password",
    label: "סיסמא",
    type: "email",
    placeholder: "הכנס סיסמא",
  },
  {
    name: "passwordConfirm",
    label: "סיסמא",
    type: "email",
    placeholder: "הכנס סיסמא",
  },
];
export const RegisterPage = () => {
  return (
    <>
      <FormComponent inputs={inputs} />
    </>
  );
};
