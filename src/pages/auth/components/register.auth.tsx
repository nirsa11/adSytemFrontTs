import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    <Container className="d-flex flex-column align-items-stretch align-items-center justify-content-center">
      {getComponent()}
      <div className={`${step == 'role' ? 'align-self-end' : 'align-self-start'} mt-3`}>
        <button id='btn-ui' onClick={() => setStep(setStepByclick)} disabled={role ? false : true}>{step == 'role' ? 'הבא' : 'הקודם'}</button>

      </div>
    </Container>
  );
};
