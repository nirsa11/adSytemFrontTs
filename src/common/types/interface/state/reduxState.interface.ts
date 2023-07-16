import { AlertState } from '../../../../redux/errorSlice';
import { UserEntity } from '../../entities/user.entity';

export type ReduxState = {
  user?: UserEntity | null;
  loader?: boolean | null;
  alert?: AlertState | null;
};