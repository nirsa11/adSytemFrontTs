import { AuthLayout } from '../../../layout/auth.layout';
import React, { useEffect, useState } from 'react';
import '../auth.css';
import { InputProps } from '../../../common/types/interface/ui/inputProps.interface';
import { FormComponent } from '../../../ui/form.ui';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { InputComponent } from '../../../ui/input.ui';
import {
  BaseState,
  RegisterPageState
} from '../../../common/types/interface/state/authState.interface';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationRegisterSchema, registerSchema } from '../../../common/schemas/schemas.auth';
import { ButtonUI } from '../../../ui/button.ui';
import { ApiRegister } from '../../../common/services/api.service';
import { setUser } from '../../../redux/userSlice';
import { UserEntity } from '../../../common/types/entities/user.entity';
import { CompanyEntity } from '../../../common/types/entities/company.entity';
import { setAlert } from '../../../redux/errorSlice';
import { RolePage } from './role.auth';
import { UserRoleEnum } from '../../../common/types/enum/userRole.enum';
import { RegisterForm } from './registerForm.auth';

const stepsArray = ['role', 'register'];

export enum StepsArrayEnum {
  role = 'role',
  register = 'register'
}

/**
 * A functional component that renders a registration form for a user to sign up.
 * @returns {JSX.Element} - The JSX element that contains the registration form.
 */
export const RegisterPage = (): JSX.Element => {
  const [step, setStep] = useState<StepsArrayEnum>(StepsArrayEnum.role);
  const [role, setRole] = useState<UserRoleEnum | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getComponent = (): JSX.Element => {
    if (step === 'register') {
      return <RegisterForm role={role} />;
    } else {
      return <RolePage setRole={setRole} role={role} />;
    }
  };

  const setStepByclick = (): StepsArrayEnum => {
    if (step === StepsArrayEnum.register) {
      return StepsArrayEnum.role;
    } else {
      return StepsArrayEnum.register;
    }
  };

  return (
    <Container className="d-flex flex-column align-items-stretch align-items-center justify-content-center ">
      {getComponent()}

      <div className={`${step == 'role' ? 'align-self-end' : 'align-self-start'} mt-3`}>
        <Button
          className="btn btn-primary"
          onClick={() => setStep(setStepByclick)}
          disabled={role ? false : true}
        >
          {step == 'role' ? 'הבא' : 'הקודם'}
        </Button>
      </div>
    </Container>
  );
};
