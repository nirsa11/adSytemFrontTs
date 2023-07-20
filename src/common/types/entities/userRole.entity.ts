import { UserRoleEnum } from "../enum/userRole.enum";
import { CompanyEntity } from "./company.entity";

export class UserRoleEntity {
  id: number;
  role: UserRoleEnum;
  company: CompanyEntity;
}