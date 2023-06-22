import { CampaignEntity } from './campagin.entity';

export class CompanyEntity {
  id?: number;

  name: string;

  nameForTaxInvoice: string;

  businessId: string;

  address: string;

  createdAt?: Date;

  public campagins: CampaignEntity[];
}
