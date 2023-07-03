import { UserRoleEnum } from '../enum/userRole.enum';
import { CompanyEntity } from './company.entity';

export class UserEntity {
  id?: number;

  name: string;

  email: string;

  password: string;

  mobileNumber: string;

  role: UserRoleEnum;

  company?: CompanyEntity;

  createdAt?: Date;

  rememberMe?: boolean;
}
