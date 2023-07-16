import { Col, Container, Form, Row } from 'react-bootstrap';
import { InputComponent } from '../../../ui/input.ui';
import { useState } from 'react';
import { RegisterPageState } from '../../../common/types/interface/state/authState.interface';
import { UserEntity } from '../../../common/types/entities/user.entity';
import { CompanyEntity, CompanyTypeEnum } from '../../../common/types/entities/company.entity';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApiUserRegister } from '../../../common/services/api.service';
import { ApiCompanyRegister } from '../../../common/services/api.service';
import { setUser } from '../../../redux/userSlice';
import { setAlert } from '../../../redux/errorSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ValidationRegisterSchema,
  registerSchema,
  analystRegisterSchema
} from '../../../common/schemas/schemas.auth';
import { ButtonUI } from '../../../ui/button.ui';
import { UserRoleEnum } from '../../../common/types/enum/userRole.enum';

const initialState: RegisterPageState = {
  name: '',
  email: '',
  password: '',
  address: '',
  mobileNumber: '',
  confirmPassword: '',
  businessId: '',
  companyName: '',
  nameForTaxInvoice: '',
  role: 0,
  error: ''
};

export type RegisterFormProps = {
  role: UserRoleEnum;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ role }) => {
  const [state, setState] = useState<RegisterPageState>(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationRegisterSchema>({
    resolver: zodResolver(role == UserRoleEnum.BASIC ? analystRegisterSchema : registerSchema),
    mode: 'onBlur',
    delayError: 500
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(state);
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitButton = async (): Promise<void> => {
    try {
      let userPayload: UserEntity;
      userPayload = {
        name: state.name,
        email: state.email,
        password: state.password,
        mobileNumber: state.mobileNumber,
        role: role
      };

      let companyPayload: CompanyEntity;
      if (role !== UserRoleEnum.BASIC) {
        companyPayload = {
          address: state.address,
          businessId: state.businessId,
          name: state.companyName,
          nameForTaxInvoice: state.nameForTaxInvoice,
          type: role === UserRoleEnum.AGENT ? CompanyTypeEnum.AGENCY : CompanyTypeEnum.BUSINESS
        } as CompanyEntity;
      }

      const user: UserEntity = await ApiUserRegister(userPayload as UserEntity);
      if (role !== UserRoleEnum.BASIC) {
        const company: CompanyEntity = await ApiCompanyRegister(companyPayload as CompanyEntity);
        console.log(company);
      }

      console.log(user);

      if (user) {
        dispatch(setUser({ ...user, rememberMe: true }));
        dispatch(setAlert({ message: `ברוך הבא ${user.name}`, type: 'success' }));

        navigate('/dashboard');
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
    <Container>
      <Form className="d-flex flex-column" onSubmit={handleSubmit(() => handleSubmitButton())}>
        {role == UserRoleEnum.BASIC ? (
          <>
            <Row>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="name"
                  register={register}
                  name="name"
                  label="איש קשר"
                  type="text"
                  placeholder="הכנס שם אישר קשר"
                  value={state && state.name}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="mobileNumber"
                  register={register}
                  name="mobileNumber"
                  label="טלפון"
                  type="tel"
                  placeholder="הכנס מספר נייד של איש קשר"
                  value={state && state.mobileNumber}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="email"
                  register={register}
                  name="email"
                  label='דוא"ל'
                  type="email"
                  placeholder='הכנס דוא"ל'
                  value={state && state.email}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="password"
                  register={register}
                  name="password"
                  label="סיסמה"
                  type="password"
                  placeholder="הכנס סיסמה"
                  value={state && state.password}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="confirmPassword"
                  register={register}
                  name="confirmPassword"
                  label="אימות סיסמה"
                  type="password"
                  placeholder="הכנס שוב את הסיסמה"
                  value={state && state.confirmPassword}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
              <Col className="col-md-6 col-sm-12 align-self-end p-2">
                {/* <ButtonUI text={'שמירה'} /> */}
                <button id="btn-ui">שמירה</button>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="companyName"
                  register={register}
                  name="companyName"
                  label={`${role === UserRoleEnum.BUSINESS_OWNER ? 'שם חברה' : 'שם חברת פרסום'}`}
                  type="text"
                  placeholder="הכנס שם חברה"
                  value={state && state.companyName}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="nameForTaxInvoice"
                  register={register}
                  name="nameForTaxInvoice"
                  label="שם לצורך חשבונית מס"
                  type="text"
                  placeholder="הכנס שם לצורך חשבונית"
                  value={state && state.nameForTaxInvoice}
                  handleChange={handleChange}
                  errors={errors}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="businessId"
                  register={register}
                  name="businessId"
                  label="ח.פ תעודת זהות"
                  type="text"
                  placeholder="הכנס ח.פ"
                  value={state && state.businessId}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="address"
                  register={register}
                  name="address"
                  label="כתובת"
                  type="text"
                  placeholder="הכנס כתובת"
                  value={state && state.address}
                  handleChange={handleChange}
                  errors={errors}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="name"
                  register={register}
                  name="name"
                  label="איש קשר"
                  type="text"
                  placeholder="הכנס שם אישר קשר"
                  value={state && state.name}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="mobileNumber"
                  register={register}
                  name="mobileNumber"
                  label="טלפון"
                  type="tel"
                  placeholder="הכנס מספר נייד של איש קשר"
                  value={state && state.mobileNumber}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="email"
                  register={register}
                  name="email"
                  label='דוא"ל'
                  type="email"
                  placeholder='הכנס דוא"ל'
                  value={state && state.email}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="password"
                  register={register}
                  name="password"
                  label="סיסמה"
                  type="password"
                  placeholder="הכנס סיסמה"
                  value={state && state.password}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="gap-3">
                <InputComponent
                  key="confirmPassword"
                  register={register}
                  name="confirmPassword"
                  label="אימות סיסמה"
                  type="password"
                  placeholder="הכנס שוב את הסיסמה"
                  value={state && state.confirmPassword}
                  handleChange={handleChange}
                  errors={errors}
                  required={true}
                />
              </Col>
              <Col className="col-md-6 col-sm-12 align-self-end p-2">
                <button id="btn-ui">שמירה</button>
              </Col>
            </Row>
          </>
        )}
      </Form>
    </Container>
  );
};
