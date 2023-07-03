import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserEntity } from '../../../common/types/entities/user.entity';
import { CompanyEntity } from '../../../common/types/entities/company.entity';
import { setUser } from '../../../redux/userSlice';
import { setAlert } from '../../../redux/errorSlice';
import {
  ApiAddCampaign,
  ApiUpdateCampaign,
  updateCompleteUser
} from '../../../common/services/api.service';
import { InputComponent } from '../../../ui/input.ui';
import { ButtonUI } from '../../../ui/button.ui';
import { RootState } from '../../../redux/store';
import { EditCompanyPageState } from '../../../common/types/interface/state/dashboard.interface';
import {
  ValidationAddCampaginSchema,
  ValidationEditCompanySchema,
  addCampaignSchema,
  editCompanySchema
} from '../../../common/schemas/schemas.dashboard';
import { DashboardLayout } from '../../../layout/dashboard.layout';
import { CampaignEntity } from '../../../common/types/entities/campagin.entity';
import { CampaignStatusEnum } from '../../../common/types/enum/campaignStatus.enum';
import { CampaignTargetEnum } from '../../../common/types/enum/campaignTarget.enum';
import { InputDateComponent } from '../../../ui/inputDate.ui';

export class EditCampaignState {
  id: number;
  name: string;
  endDate: string;
  budget: string;
  dailyBudget: string;
  status: CampaignStatusEnum;
  createdBy: string;
  createdAt: string;
  target: CampaignTargetEnum.traffic;
}

const initialState: EditCampaignState = {
  id: 0,
  name: '',
  endDate: '',
  budget: '',
  dailyBudget: '',
  createdBy: '',
  createdAt: '',
  status: CampaignStatusEnum.active,
  target: CampaignTargetEnum.traffic
};

/**
 * A component that allows the user to edit a campaign. The component displays a form with fields for the campaign name,
 * end date, budget, daily budget, and status. The user can edit these fields and submit the form to update the campaign.
 * If the update is successful, the user is redirected to the "My Campaigns" page.
 * @returns {JSX.Element} - A form for editing a campaign.
 */
export const EditCampaign = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let { campaign } = location.state;
  const user: UserEntity = useSelector((state: RootState) => state?.user?.user);

  const [state, setState] = useState<EditCampaignState>({
    id: campaign.id,
    name: campaign.name,
    endDate: campaign.endDate,
    budget: campaign.budget,
    dailyBudget: campaign.dailyBudget,
    createdBy: campaign.createdBy,
    createdAt: campaign.createdAt,
    status: campaign.status,
    target: campaign.target
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationAddCampaginSchema>({
    resolver: zodResolver(addCampaignSchema),
    defaultValues: {
      name: campaign.name,
      endDate: campaign.endDate,
      budget: campaign.budget,
      dailyBudget: campaign.dailyBudget,
      status: campaign.status
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
        id: state.id,
        name: state.name,
        endDate: new Date(state.endDate).getTime(),
        budget: typeof state.budget == 'number' ? state.budget : parseInt(state.budget),
        dailyBudget:
          typeof state.dailyBudget == 'number' ? state.dailyBudget : parseInt(state.dailyBudget),
        createdBy: user.id,
        status: state.status,
        companyId: user.company.id,
        target: state.target
      };

      const campaignUpdated: CampaignEntity = await ApiUpdateCampaign(payload);

      if (campaignUpdated) {
        const company: CompanyEntity = {
          ...user.company,
          campaigns: user.company.campaigns.map((campaign) => {
            if (campaign.id === state.id) {
              return campaignUpdated;
            } else {
              return campaign;
            }
          })
        };

        dispatch(setUser({ ...user, company, rememberMe: true }));
        dispatch(setAlert({ message: 'הקמפיין עודכן בהצלחה', type: 'success' }));
        navigate('/dashboard/my-campaigns');
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
      <Container
        className="d-flex flex-column  justify-content-center  align-items-center p-1"
        fluid
      >
        <Col
          md={9}
          sm={9}
          className="d-flex flex-column justify-content-center  align-items-center bg-light m-1"
        >
          <h5 className="align-self-start">הוסף חברה</h5>
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
              <Col xs={12} md={6} className="p-3 d-flex">
                <InputDateComponent
                  label="תאריך סיום"
                  name="endDate"
                  register={register}
                  type="date"
                  placeholder="הכנס ח.פ"
                  value={state && state.endDate}
                  setState={setState}
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
              <Col xs={12} md={4} className="p-3">
                <Form.Label htmlFor="mySelect">בחר את מטרת הקמפיין</Form.Label>
                <Form.Select
                  {...register('target')}
                  name="target"
                  value={state && state.target}
                  onChange={handleSelectChange}
                  defaultValue={CampaignTargetEnum.appPromoting}
                >
                  {Object.values(CampaignTargetEnum).map((option) => (
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
