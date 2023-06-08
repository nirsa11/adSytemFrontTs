import { AuthLayout } from "../../../layout/auth.layout";
import React, { useState } from "react";
import "../auth.css";
import { InputProps } from "../../../common/types/interface/ui/inputProps.interface";
import { FormComponent } from "../../../ui/form.ui";
import { Button, Form, Row } from "react-bootstrap";
import { InputComponent } from "../../../ui/input.ui";
import { BaseState, RegisterPageState } from "../../../common/types/interface/state/authState.interface";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {ValidationRegisterSchema, registerInputs, registerSchema} from "./index.data"



const initialState: RegisterPageState  = {
    name: "",
    email: "",
    password: "",
    address : "",
    mobileNumber: "",
    confirmPassword: "",
    businessId  : "",
    companyName : "",
    nameForTaxInvoice : "",
    role : 0,
}


export const RegisterPage = () => {
  const [state, setState] = useState<RegisterPageState>(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
        ...prevState,
          [name]: value,
      }));
  };

  const inuputConfirmPassword ={
    name: "password",
    label: "אימות סיסמה",
    type: "password",
    placeholder: "הכנס סיסמא",
    value : state.confirmPassword,
    handleChange: handleChange,
  }
  const handleSubmitButton = <T,>(state  : RegisterPageState | any)  : void=> {
   
  }


  return (
    <>
      <FormComponent inputs={registerInputs.map(input => {

        return {
        ...input,
          value:  state[input.name] && state[input.name] || "",
          handleChange: handleChange,
        };
      }) as InputProps[]
      } submitFunc={() => handleSubmit(() => handleSubmitButton<ValidationRegisterSchema>(state))}  double = {true} >
       <div className="d-flex flex-row  justify-content-between" >
           <div>
           <InputComponent {...inuputConfirmPassword} />
           </div>
           <div className="d-flex">
           <Button className="align-self-end">שלח</Button>
           </div>
      </div>
      </FormComponent>
    </>
  );
};
