import React, { useEffect, useState } from 'react';
import '../auth.css';
import { FormComponent } from '../../../ui/form.ui';
import { InputProps } from '../../../common/types/interface/ui/inputProps.interface';
import { InputComponent } from '../../../ui/input.ui';
import { Button, Col, Form, FormGroup, Modal, Nav, Row } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ValidationLoginSchema,
  ValidationResetSchema,
  loginSchema,
  resetEmailSchema
} from './schemas.zod';
import { ButtonUI } from '../../../ui/button.ui';
import { UserEntity } from '../../../common/types/entities/user.entity';
import { ApiLogin, ApiResetEmail } from '../../../common/services/api.service';
import { setUser } from '../../../redux/userSlice';
import {
  LoginPageState,
  ResetPasswordState
} from '../../../common/types/interface/state/authState.interface';
import { ModalUIComponent } from '../../../ui/modal.ui';
import { SizeButtonEnum } from '../../../common/types/interface/ui/buttonProps.interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setAlert } from '../../../redux/errorSlice';

const initialState: LoginPageState = {
  email: '',
  password: '',
  rememberMe: false,
  error: ''
};

const initialStateReset: ResetPasswordState = {
  emailReset: '',
  error: ''
};

export const LoginPage = (): JSX.Element => {
  const [state, setState] = useState<LoginPageState>(initialState);
  const [stateReset, setResetState] = useState<ResetPasswordState>(initialStateReset);
  const [modal, setModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [forgotPasswordExpired, setForgotPasswordExpired] = useState(
    searchParams.get('forgotPassword')
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ValidationLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    delayError: 500
  });

  const {
    register: registerResetPassword,
    handleSubmit: handleSubmitResetPassword,
    formState: { errors: errorsResetPassword }
  } = useForm<ValidationResetSchema>({
    resolver: zodResolver(resetEmailSchema),
    mode: 'onBlur',
    delayError: 500
  });

  useEffect(() => {
    setModal(true);
    return () => setModal(false);
  }, [forgotPasswordExpired]);

  useEffect(() => {
    const inputs = document.querySelectorAll('input');

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setState((prevState) => ({
        ...prevState,
        [name]: value
      }));
      setValue(name, value);
    };

    inputs.forEach((input) => {
      input.addEventListener('input', handleInputChange);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('input', handleInputChange);
      });
    };
  }, [setValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeResetPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResetState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetPassword = async () => {
    try {
      await ApiResetEmail({ email: stateReset.emailReset });
      dispatch(
        setAlert({ message: "נשלח מייל לאיפוס , בדוק את תיבת הדוא''ל שלך", type: 'success' })
      );
    } catch (error) {
      setResetState((prevState) => ({
        ...prevState,
        error: error
      }));
      dispatch(setAlert({ message: error.message, type: 'danger' }));
    }
  };
  const handleSubmitButton = async () => {
    try {
      const user: UserEntity = await ApiLogin(state as LoginPageState);
      if (user) {
        dispatch(setUser({ ...user, rememberMe: state.rememberMe }));
        dispatch(setAlert({ message: `ברוך שובך ${user.name}`, type: 'success' }));
        navigate('/home');
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message
      }));
      dispatch(setAlert({ message: error.message, type: 'danger' }));
    }
  };

  return (
    <div>
      <ModalUIComponent show={modal} onHide={() => setModal(false)} title={'שכחתי סיסמה'}>
        <Form noValidate onSubmit={handleSubmitResetPassword(resetPassword)}>
          <Row md={12}>
            <InputComponent
              register={registerResetPassword}
              key={'emailReset'}
              name={'emailReset'}
              label="מייל"
              type="email"
              placeholder='הכנס דוא"ל לאיפוס'
              defaultValue=""
              value={stateReset && stateReset.emailReset}
              handleChange={handleChangeResetPassword}
              errors={errorsResetPassword}
            />
          </Row>
          <Row md={12}>
            <Modal.Footer className="d-flex justify-content-start">
              <ButtonUI text={'שלח מייל לאיפוס'} size={SizeButtonEnum.sm} />
            </Modal.Footer>
          </Row>
        </Form>
      </ModalUIComponent>
      <Form
        className="d-flex flex-column mt-5 "
        noValidate
        style={{ maxHeight: '100vh' }}
        onSubmit={handleSubmit(handleSubmitButton)}
      >
        <Row className="col-md-12 mx-auto gap-5">
          <InputComponent
            register={register}
            key={'email'}
            name={'email'}
            label="מייל"
            type="email"
            placeholder="הכנס מייל"
            defaultValue=""
            value={state && state.email}
            handleChange={handleChange}
            errors={errors}
          />
        </Row>
        <Row className="col-md-12 mx-auto gap-5">
          <InputComponent
            register={register}
            key={'password'}
            name={'password'}
            label="סיסמה"
            type="password"
            placeholder="הכנס סיסמה"
            defaultValue=""
            value={state && state.password}
            handleChange={handleChange}
            errors={errors}
          />
        </Row>

        <Row className="mt-5">
          <div className="d-flex  flex-row " style={{ marginRight: '1rem' }}>
            <Form.Check // prettier-ignore
              type={'checkbox'}
              label="זכור אותי"
              checked={state && state.rememberMe}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  rememberMe: !state.rememberMe
                }))
              }
            />
            <a className="link" onClick={() => setModal(!modal)}>
              {' '}
              שכחתי סיסמא
            </a>
          </div>
        </Row>
        {/* {state && state.error ? <p className="text-danger">{state.error as string}</p> : ''} */}
        <Row md={3} className="m-2">
          <ButtonUI text={'כניסה'} />
        </Row>
      </Form>
    </div>
  );
};
