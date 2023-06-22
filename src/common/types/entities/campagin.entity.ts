export enum CampaignStatusEnum {
  active = 'active',
  paused = 'paused',
  completed = 'completed'
}

export class CampaignEntity {
  id?: number;
  name: string;
  endDate: number;
  budget: number;
  createdBy: number;
  status: CampaignStatusEnum;
  dailyBudget: number;
  createdAt?: number = new Date().getTime();
  companyId: number;
}
