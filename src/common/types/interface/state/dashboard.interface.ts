import { CampaignStatusEnum } from "../../enum/campaignStatus.enum";
import { CampaignTargetEnum } from "../../enum/campaignTarget.enum";


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
  target: CampaignTargetEnum;
}

export class MyCampaignState {
  id: number;
  name: string;
  endDate: string;
  budget: string;
  dailyBudget: string;
  status: CampaignStatusEnum;
  createdBy: string;
  createdAt: string;
  companyId: number;
  target: CampaignTargetEnum;
}
