import { CompanyEntity } from "./company.entity";

export class UserEntity {
  id: number;

  name: string;

  email: string;

  password: string;

  mobileNumber: string;

  role: number;

  companies?: CompanyEntity[];

  createdAt: Date;
}
