import React, { useEffect, useState } from 'react';
import { InputComponent } from '../../../ui/input.ui';
import { Form, Modal, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationLoginSchema, ValidationResetSchema, loginSchema, resetEmailSchema } from '../../../common/schemas/schemas.auth';
import { ButtonUI } from '../../../ui/button.ui';
import { UserEntity } from '../../../common/types/entities/user.entity';
import { ApiLogin, ApiResetEmail } from '../../../common/services/api.service';
import { setUser } from '../../../redux/userSlice';
import { LoginPageState, ResetPasswordState } from '../../../common/types/interface/state/authState.interface';
import { ModalUIComponent } from '../../../ui/modal.ui';
import { SizeButtonEnum } from '../../../common/types/interface/ui/buttonProps.interface';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../redux/errorSlice';
import { removeCookies } from '../../../common/utils';

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

/**
 * A functional component that renders a login page. The component uses React hooks to manage state and form validation.
 * @returns {JSX.Element} - A JSX element that represents the login page.
 */
export const LoginPage = (): JSX.Element => {
  const [state, setState] = useState<LoginPageState>(initialState);
  const [stateReset, setResetState] = useState<ResetPasswordState>(initialStateReset);
  const [modal, setModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

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
        navigate('/dashboard');
      }
    } catch (error) {
      dispatch(setAlert({ message: error.message || 'משהו השתבש', type: 'danger' }));

      dispatch(setUser(null));
      removeCookies('accessToken');
      removeCookies('tokenTime');
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
              required={true}
            />
          </Row>
          <Row md={12}>
            <Modal.Footer className="d-flex justify-content-start">
              <button id='btn-ui'>שלח מייל לאיפוס</button>
            </Modal.Footer>
          </Row>
        </Form>
      </ModalUIComponent>
      <Form
        className="d-flex flex-column mt-5"
        noValidate
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
            required={true}
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
            required={true}
            errors={errors}
          />
        </Row>

        <Row className="login-checkbox">
          <div className="d-flex flex-row">
            <Form.Check // prettier-ignore
              type={'checkbox'}
              label="זכור אותי"
              checked={state && state.rememberMe}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  rememberMe: !state.rememberMe
                }))
              } />
            <a className="link" onClick={() => setModal(!modal)}>{' '}שכחתי סיסמה</a>
          </div>
        </Row>

        <Row className="col-md-3 col-sm-6 align-self-start m-5">
          <button id='btn-ui'>כניסה</button>
        </Row>
      </Form>
    </div>
  );
};