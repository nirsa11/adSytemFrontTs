import { CampaignStatusEnum } from '../../entities/campagin.entity';

export interface EditCompanyPageState {
  name: string;
  email: string;
  password?: string;
  mobileNumber: string;
  role: number;
  confirmPassword?: string;
  companyName: string;
  nameForTaxInvoice: string;
  businessId: string;
  address: string;
  error: string;
}
export interface AddCampaginState {
  name: string;
  endDate: Date;
  budget?: number;
  dailyBudget: number;
  status: CampaignStatusEnum;
}
