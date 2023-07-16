import { CampaignStatusEnum } from '../enum/campaignStatus.enum';
import { CampaignTargetEnum } from '../enum/campaignTarget.enum';

export class CampaignEntity {
  id?: number;
  name: string;
  endDate: number;
  startDate: number;
  budget: number;
  createdBy: number;
  status: CampaignStatusEnum;
  dailyBudget: number;
  createdAt?: number = new Date().getTime();
  companyId: number;
  target: CampaignTargetEnum;
}