import { RequestsStatusEnum } from "../enum/requestsStatus.enum";

export class RequestEntity {
  id: number;
  agencyId: number;
  businessId: number;
  status: RequestsStatusEnum;
  sender: string;
}