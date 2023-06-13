import React, { useEffect, useState } from "react";
import "../auth.css";
import { FormComponent } from "../../../ui/form.ui";
import { InputProps } from "../../../common/types/interface/ui/inputProps.interface";
import { InputComponent } from "../../../ui/input.ui";
import { Button, Col, Form, FormGroup, Modal, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { ValidationLoginSchema, ValidationResetSchema, loginSchema, resetEmailSchema } from "./schemas.zod";
import { ButtonUI } from "../../../ui/button.ui";
import { UserEntity } from "../../../common/types/entities/user.entity";
import { ApiLogin, ApiResetEmail } from "../../../common/services/api.service";
import { setUser } from "../../../redux/userSlice";
import { LoginPageState, ResetPasswordState } from "../../../common/types/interface/state/authState.interface";
import {ModalUIComponent} from "../../../ui/modal.ui";
import { SizeButtonEnum } from "../../../common/types/interface/ui/buttonProps.interface";


const initialState : LoginPageState = {
  email : "",
  password : "",
  error : ""
}

const initialStateReset : ResetPasswordState = {
  emailReset : "",
  error : ""
}



export const LoginPage = () => {

  const [state, setState] = useState<LoginPageState>(initialState);
  const [stateReset, setResetState] = useState<ResetPasswordState>(initialStateReset);
  const [modal,setModal] = useState<boolean>(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode : "onBlur",
    delayError :500
  });
  
  const {
    register : registerResetPassword,
    handleSubmit : handleSubmitResetPassword,
    formState: { errors : errorsResetPassword },
  } = useForm<ValidationResetSchema>({
    resolver: zodResolver(resetEmailSchema),
    mode : "onBlur",
    delayError :500
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
        ...prevState,
          [name]: value,
      }));
    };
    
    const handleChangeResetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResetState((prevState) => ({
        ...prevState,
          [name]: value,
      }));

  }
  
  const resetPassword = async () => {

    try {
      await ApiResetEmail({email : stateReset.emailReset});
    } catch (error) {
      setResetState((prevState) => ({
        ...prevState,
          error: error.message,
      }));
    }

  }
  const handleSubmitButton =   async( ) => {
    
    try {
      const user : UserEntity = await ApiLogin(state as LoginPageState)
      if (user) {
        dispatch(setUser(user))

        
        navigate("/home");
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
          error: error.message,
      }));
    }
  }

  return (
    <div>
       <ModalUIComponent show={modal} onHide={() => setModal(false)} title = {"שכחתי סיסמה"} >
       <Form noValidate onSubmit={handleSubmitResetPassword(resetPassword)}>
       <Row md={12}>
              <InputComponent
                    register={registerResetPassword}
                    key={"emailReset"}
                    name={"emailReset"}
                    label="מייל"
                    type="email"
                    placeholder='הכנס דוא"ל לאיפוס'
                    defaultValue=""
                    value={stateReset && stateReset.emailReset}
                    handleChange={handleChangeResetPassword}
                    errors={errorsResetPassword}
                    />
                    </Row>
                <Row md={12} >
                <Modal.Footer className="d-flex justify-content-start">
                  <ButtonUI text = {"שלח מייל לאיפוס"} size={SizeButtonEnum.sm} />
                    </Modal.Footer>
                </Row>
            </Form>
        </ModalUIComponent>
      <Form className="d-flex flex-column mt-5 " noValidate style={{maxHeight : "100vh" }} onSubmit={handleSubmit(handleSubmitButton)}>
      <Row className="col-md-12 mx-auto gap-5">
      <InputComponent
        register={register}
        key={"email"}
        name={"email"}
        label="מייל"
        type="email"
        placeholder="הכנס מייל"
        defaultValue=""
        value={state && state.email}
        handleChange={handleChange}
        errors={errors }
        />
        </Row>
      <Row className="col-md-12 mx-auto gap-5">
      <InputComponent
        register={register}
        key={"password"}
        name={"password"}
        label="סיסמה"
        type="password"
        placeholder="הכנס סיסמה"
        defaultValue=""
        value={state && state.password}
        handleChange={handleChange}
        errors={errors }
        />
        </Row>

        <Row className="mt-5" >
        <div className="d-flex  flex-row " style={{marginRight: "1rem"}}>
        <Form.Check // prettier-ignore   
          type={"checkbox"}
          label="זכור אותי"
          />
           <a className='link' onClick = {() => setModal(!modal)}> שכחתי סיסמא</a>
        </div>
      </Row>
        {
          state &&  state.error ?  (
              <p className="text-danger">{state.error as string}</p> 
          )
          :
          ""
        }
      <Row md={3} className="m-2">
        <ButtonUI text = {"כניסה"} />
      </Row>
      </Form>

     
    </div>
  );
};
