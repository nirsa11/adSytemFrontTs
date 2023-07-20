import { UserRoleEnum } from '../enum/userRole.enum';
import { CompanyEntity } from './company.entity';
import { UserRoleEntity } from './userRole.entity';

export class UserEntity {
  id?: number;

  name: string;

  email: string;

  password: string;

  mobileNumber: string;

  role: UserRoleEnum;

  currCompany?: CompanyEntity;

  createdAt?: Date;

  rememberMe?: boolean;

  userRoles?: UserRoleEntity[];
}