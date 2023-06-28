import React, { ReactEventHandler, useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormSelect, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserEntity } from '../../../common/types/entities/user.entity';
import { CompanyEntity } from '../../../common/types/entities/company.entity';
import { setUser } from '../../../redux/userSlice';
import { setAlert } from '../../../redux/errorSlice';
import { ApiAddCampagin, updateCompleteUser } from '../../../common/services/api.service';
import { InputComponent } from '../../../ui/input.ui';
import { ButtonUI } from '../../../ui/button.ui';
import { RootState } from '../../../redux/store';
import {
  AddCampaginState,
  EditCompanyPageState
} from '../../../common/types/interface/state/dashboard.interface';
import {
  ValidationAddCampaginSchema,
  ValidationEditCompanySchema,
  addCampaignSchema,
  editCompanySchema
} from '../../../common/schemas/schemas.dashboard';
import { DashboardLayout } from '../../../layout/dashboard.layout';
import { CampaignEntity, CampaignStatusEnum } from '../../../common/types/entities/campagin.entity';
import { InputDateComponent } from '../../../ui/inputDate.ui';

const initialState: AddCampaginState = {
  name: '',
  dailyBudget: 0,
  endDate: new Date(),
  budget: 0,
  status: CampaignStatusEnum.paused
};

/**
 * Renders a form for creating a new campaign. The form includes fields for the campaign name, daily budget, total budget, end date, and status.
 * @returns {JSX.Element} - A form for creating a new campaign.
 */
export const AddCampaign = (): JSX.Element => {
  const user: UserEntity = useSelector((state: RootState) => state?.user?.user);
  const [state, setState] = useState<AddCampaginState>(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationAddCampaginSchema>({
    resolver: zodResolver(addCampaignSchema),

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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value?.trim() || undefined
    }));
  };

  const handleSubmitButton = async (): Promise<void> => {
    try {
      const payload: CampaignEntity = {
        name: state.name,
        endDate: new Date(state.endDate).getTime(),
        budget: typeof state.budget == 'number' ? state.budget : parseInt(state.budget),
        dailyBudget:
          typeof state.dailyBudget == 'number' ? state.dailyBudget : parseInt(state.dailyBudget),
        createdBy: user.id,
        status: CampaignStatusEnum[state.status],
        companyId: user.companies[0].id
      };

      const campaignCreated: CampaignEntity = await ApiAddCampagin(payload);

      if (campaignCreated) {
        const companies = user.companies.map((company, index) => {
          if (index === 0) {
            if (company.campaigns && company.campaigns.length) {
              // Push the value to the existing property
              const campaigns = [...company.campaigns, campaignCreated];
              return {
                ...company,
                campaigns: campaigns
              };
            } else {
              // Create the property and assign an array with the value
              const campaigns = [campaignCreated];
              return {
                ...company,
                campaigns: campaigns
              };
            }
          }
          return company;
        });

        dispatch(setUser({ ...user, companies: companies, rememberMe: true }));
        dispatch(setAlert({ message: 'הקמפיין נוצר בהצלחה', type: 'success' }));
      }
    } catch (error) {
      console.error(error);
      setState((prevState) => ({
        ...prevState,
        error: error.message
      }));
      dispatch(setAlert({ message: error.message, type: 'danger' }));
    }
  };

  return (
    <>
      <Container
        className="d-flex flex-column  justify-content-center  align-items-center p-1"
        fluid
      >
        <Col md={9} className="d-flex justify-content-start">
          <h3 className="text-light">יצירת קמפיין</h3>
        </Col>
        <Col
          md={9}
          sm={9}
          className="d-flex flex-column justify-content-center  align-items-center bg-light m-1"
        >
          <Form
            className="d-flex flex-column mt-5 border-1 bg-light"
            style={{ maxHeight: '100vh' }}
            onSubmit={handleSubmit(() => handleSubmitButton())}
          >
            <Row>
              <Col xs={12} md={6} className="p-3">
                <InputComponent
                  key="name"
                  register={register}
                  name="name"
                  label="שם הקמפיין"
                  type="text"
                  placeholder="הכנס שם קמפיין"
                  value={state && state.name}
                  // defaultValue={user && state.companyName}
                  handleChange={handleChange}
                  errors={errors}
                />
              </Col>
              <Col xs={12} md={6} className="p-3">
                <InputComponent
                  key="dailyBudget"
                  register={register}
                  name="dailyBudget"
                  label="תקציב יומי"
                  type="number"
                  placeholder="הכנס תקציב יומי"
                  value={state && state.dailyBudget}
                  handleChange={handleChange}
                  errors={errors}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} className="p-3">
                <InputComponent
                  key="budget"
                  register={register}
                  name="budget"
                  label="תקציב כולל"
                  type="number"
                  placeholder="הכנס ח.פ"
                  value={state && state.budget}
                  handleChange={handleChange}
                  errors={errors}
                />
              </Col>
              <Col xs={12} md={6} className="p-3">
                <InputDateComponent
                  label="תאריך סיום"
                  name="endDate"
                  register={register}
                  type="date"
                  placeholder="הכנס ח.פ"
                  value={state && state.endDate}
                  setState={setState}
                  errors={errors}
                />
              </Col>
              <Col xs={12} md={4} className="p-3">
                <Form.Label htmlFor="mySelect">בחר את סטטוס הקמפיין</Form.Label>
                <Form.Select
                  {...register('status')}
                  name="status"
                  value={state && state.status}
                  onChange={handleSelectChange}
                  defaultValue={CampaignStatusEnum.active}
                >
                  {Object.values(CampaignStatusEnum).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Col xs={12} md={12} className="d-flex justify-content-center p-3 mt-3">
              <ButtonUI text={'שמירה'} />
            </Col>
          </Form>
        </Col>
      </Container>
    </>
  );
};
