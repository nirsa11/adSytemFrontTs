import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserEntity } from '../../../common/types/entities/user.entity';
import { CompanyEntity } from '../../../common/types/entities/company.entity';
import { setUser } from '../../../redux/userSlice';
import { setAlert } from '../../../redux/errorSlice';
import { updateCompleteUser } from '../../../common/services/api.service';
import { InputComponent } from '../../../ui/input.ui';
import { ButtonUI } from '../../../ui/button.ui';
import { RootState } from '../../../redux/store';
import { EditCompanyPageState } from '../../../common/types/interface/state/dashboard.interface';
import {
  ValidationEditCompanySchema,
  editCompanySchema
} from '../../../common/schemas/schemas.dashboard';
import { DashboardLayout } from '../../../layout/dashboard.layout';

const initialState: EditCompanyPageState = {
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

/**
 * A functional component that renders a form for editing a user's company profile.
 * @returns {JSX.Element} - A form for editing a user's company profile.
 */
export const EditCompanyPage = (): JSX.Element => {
  const user: UserEntity = useSelector((state: RootState) => state?.user?.user);
  const [state, setState] = useState<EditCompanyPageState>({
    name: user.name,
    email: user.email,
    password: user.password,
    address: user.companies[0].address,
    mobileNumber: user.mobileNumber,
    businessId: user.companies[0].businessId,
    confirmPassword: '',
    companyName: user.companies[0].name,
    nameForTaxInvoice: user.companies[0].nameForTaxInvoice,
    error: '',
    role: 0
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationEditCompanySchema>({
    resolver: zodResolver(editCompanySchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.companies[0].address,
      mobileNumber: user.mobileNumber,
      businessId: user.companies[0].businessId,
      confirmPassword: '',
      companyName: user.companies[0].name,
      nameForTaxInvoice: user.companies[0].nameForTaxInvoice
    },
    mode: 'onBlur',
    delayError: 500
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value?.trim() || undefined
    }));
  };

  const handleSubmitButton = async (): Promise<void> => {
    try {
      const payload: UserEntity = {
        name: state.name,
        email: state.email,
        password: state.password,
        mobileNumber: state.mobileNumber,
        role: 1,
        companies: [
          {
            id: user.companies[0].id,
            address: state.address,
            businessId: state.businessId,
            name: state.companyName,
            nameForTaxInvoice: state.nameForTaxInvoice
          } as CompanyEntity
        ]
      };

      const userUpdated: UserEntity = await updateCompleteUser(payload as UserEntity);

      if (userUpdated) {
        dispatch(setUser({ ...userUpdated, rememberMe: true }));
        dispatch(setAlert({ message: 'הפרופיל עודכן בהצלחה', type: 'success' }));
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
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center pt-5 mt-4">
        <h5 className="align-self-start">ערוך את הפרופיל שלך</h5>
        <Col md={12} sm={12}>
          <Form
            className="d-flex flex-column mt-5 border-1 bg-light"
            style={{ maxHeight: '100vh' }}
            onSubmit={handleSubmit(() => handleSubmitButton())}
          >
            <Row>
              <Col xs={12} md={4} className="gap-3">
                <InputComponent
                  key="companyName"
                  register={register}
                  name="companyName"
                  label="שם חברה"
                  type="text"
                  placeholder="הכנס שם חברה"
                  value={state && state.companyName}
                  // defaultValue={user && state.companyName}
                  handleChange={handleChange}
                  errors={errors}
                />
              </Col>
              <Col xs={12} md={4} className="gap-3">
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
              <Col xs={12} md={4} className="gap-3">
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
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4} className="gap-3">
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
              <Col xs={12} md={4} className="gap-3">
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
                />
              </Col>
              <Col xs={12} md={4} className="gap-3">
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
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={4} className="gap-3">
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
                />
              </Col>
              <Col xs={12} md={4} className="gap-3">
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
                />
              </Col>
              <Col xs={12} md={4} className="gap-3">
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
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12} className="d-flex justify-content-center p-3 mt-3">
                <ButtonUI text={'שמירה'} />
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
    </>
  );
};
