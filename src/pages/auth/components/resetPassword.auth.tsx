import React, { useEffect, useState } from 'react';
import '../auth.css';
import { FormComponent } from '../../../ui/form.ui';
import { InputProps } from '../../../common/types/interface/ui/inputProps.interface';
import { InputComponent } from '../../../ui/input.ui';
import { Button, Col, Form, FormGroup, Modal, Nav, Row } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ValidationLoginSchema,
  ValidationResetPasswordSchema,
  ValidationResetSchema,
  loginSchema,
  resetEmailSchema,
  resetPasswordSchema
} from '../../../common/schemas/schemas.auth';
import { ButtonUI } from '../../../ui/button.ui';
import { UserEntity } from '../../../common/types/entities/user.entity';
import {
  ApiLogin,
  ApiResetEmail,
  checkTokenApi,
  updateUser
} from '../../../common/services/api.service';
import { setUser } from '../../../redux/userSlice';
import { ResetPasswordPageState } from '../../../common/types/interface/state/authState.interface';
import { ModalUIComponent } from '../../../ui/modal.ui';
import { SizeButtonEnum } from '../../../common/types/interface/ui/buttonProps.interface';
import { removeCookies } from '../../../common/utils';
import { setAlert } from '../../../redux/errorSlice';

const initialState: ResetPasswordPageState = {
  password: '',
  confirmPassword: '',
  error: ''
};

export const ResetPasswordPage = ({ setToken, setResetPassword }) => {
  const [state, setState] = useState<ResetPasswordPageState>(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    delayError: 120
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitButton = async () => {
    try {
      const user: UserEntity = await updateUser({ password: state.password });
      if (user) {
        setAlert({
          message: 'הסיסמה שונתה בהצלחה',
          type: 'success'
        });
        searchParams.delete('token');
        setSearchParams(searchParams);
        removeCookies('accessToken');
        removeCookies('tokenTime');
        setToken('');
        setResetPassword(false);
        navigate('/auth');
      }
    } catch (error) {
      setAlert({
        message: 'משהו השתבש . נסה שנית או פנה למפעיל',
        type: 'danger'
      });
      setState((prevState) => ({
        ...prevState,
        error: error.message
      }));
    }
  };

  return (
    <div>
      <Form
        className="d-flex flex-column mt-5 "
        noValidate
        style={{ maxHeight: '100vh' }}
        onSubmit={handleSubmit(handleSubmitButton)}
      >
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

        <Row className="col-md-12 mx-auto gap-5">
          <InputComponent
            register={register}
            key={'confirmPassword'}
            name={'confirmPassword'}
            label="אימות סיסמה"
            type="password"
            placeholder=" הכנס סיסמה שנית"
            defaultValue=""
            value={state && state.confirmPassword}
            handleChange={handleChange}
            errors={errors}
          />
        </Row>
        {state && state.error ? <p className="text-danger">{state.error as string}</p> : ''}
        <Row md={3} className="m-2">
          <ButtonUI text={'אפס סיסמה'} />
        </Row>
      </Form>
    </div>
  );
};
