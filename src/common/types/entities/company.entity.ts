import { CampaignEntity } from './campagin.entity';
export enum CompanyTypeEnum {
  BUSINESS = 'BUSINESS',
  AGENCY = 'AGENCY'
}

export class CompanyEntity {
  id?: number;

  name: string;

  nameForTaxInvoice: string;

  businessId: string;

  address: string;

  createdAt?: Date;

  type: CompanyTypeEnum;

  public campaigns: CampaignEntity[];
}
