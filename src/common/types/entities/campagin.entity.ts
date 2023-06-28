export enum CampaignStatusEnum {
  active = 'פעיל',
  paused = 'טיוטה',
  completed = 'הושלם'
}

export enum CampaignTargetEnum {
  traffic = 'טראפיק',
  leads = 'לידים',
  sales = 'מכירות',
  appPromoting = 'קידום אפליקציה',
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
  target?: CampaignTargetEnum;
}
