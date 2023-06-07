export interface InputProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
}

export interface FormProps {
  inputs: InputProps[];
}
