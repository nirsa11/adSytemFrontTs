import { CompanyTypeEnum } from '../../entities/company.entity';
import { CampaignStatusEnum } from '../../enum/campaignStatus.enum';
import { CampaignTargetEnum } from '../../enum/campaignTarget.enum';
import { RequestsStatusEnum } from '../../enum/requestsStatus.enum';
import { UserRoleEnum } from '../../enum/userRole.enum';

export interface EditCompanyPageState {
  name: string;
  email: string;
  password?: string;
  mobileNumber: string;
  role: UserRoleEnum;
  confirmPassword?: string;
  companyName: string;
  nameForTaxInvoice: string;
  businessNumber: string;
  address: string;
  error: string;
}

export interface AddCampaginState {
  name: string;
  endDate: Date;
  startDate: Date;
  budget?: number;
  dailyBudget: number;
  status: CampaignStatusEnum;
  target: CampaignTargetEnum;
}

export class MyCampaignState {
  id: number;
  name: string;
  endDate: string;
  startDate: string;
  budget: string;
  dailyBudget: string;
  status: CampaignStatusEnum;
  createdBy: string;
  createdAt: string;
  companyId: number;
  target: CampaignTargetEnum;
}

export class BussinesAgencyRequestState {
  id: number;
  sender: string | number;
  status?: RequestsStatusEnum;
  target?: string | number;
}

export class BussinesAgencyLinkingState {
  businessId: number;
  agencyId: number;
  sender: CompanyTypeEnum;
}