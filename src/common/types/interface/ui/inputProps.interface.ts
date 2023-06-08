import React, {
  ChangeEventHandler,
  Fragment,
  ReactElement,
  ReactNode,
} from "react";

export interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value: any;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
}

export interface FormProps {
  inputs: InputProps[];
  children: JSX.Element | JSX.Element[];
  double?: boolean;
  submitFunc?: (props: Function) => any;
}
