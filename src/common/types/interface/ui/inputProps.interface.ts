import React, { ChangeEventHandler, Fragment, ReactElement, ReactNode } from 'react';
import { FieldErrors } from 'react-hook-form';

export interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: any;
  defaultValue?: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errors?: FieldErrors;
  required?: boolean;
  register?: (name: string, RegisterOptions?) => { onChange; onBlur; name; ref };
}
export interface InputDateProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: any;
  defaultValue?: string;
  setState: any;
  errors?: FieldErrors;
  minDate?: Date;
  register?: (name: string, RegisterOptions?) => { onChange; onBlur; name; ref };
}

export interface FormProps {
  inputs: InputProps[];
  children: JSX.Element | JSX.Element[];
  double?: boolean;
  submitFunc?: (props: Function) => any;
}
