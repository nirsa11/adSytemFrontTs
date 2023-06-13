import { AxiosInstance, AxiosResponse } from 'axios';
import { AxiosService } from './axios.service';
import { LoginPageState, RegisterPageState } from '../types/interface/state/authState.interface';
import { UserEntity } from '../types/entities/user.entity';
import { setCookies } from '../utils';

const httpRequest: AxiosInstance = new AxiosService().getClient();

export const ApiLogin = async ({ email, password }: LoginPageState) => {
  try {
    const response = await httpRequest.post('/users/login', { email, password });

    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const ApiRegister = async (data: UserEntity): Promise<UserEntity> => {
  try {
    const response = await httpRequest.post('/users/register', data);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const ApiResetEmail = async ({ email }: { email: string }): Promise<UserEntity> => {
  try {
    const response = await httpRequest.post('/users/forgotpassword', { email });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const checkTokenApi = async ({ token }: { token: string }): Promise<boolean> => {
  try {
    const response = await httpRequest.get('/users/forgotpasswordtoken', { params: { token } });

    if (response.status === 200) {
      const seventDays = new Date().getTime() + 360000 * 24 * 60 * 7;

      setCookies('accessToken', response.data.accessToken, seventDays);
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (userUpdates: Partial<UserEntity>): Promise<UserEntity> => {
  try {
    const response: AxiosResponse<any, any> = await httpRequest.put('/users', { ...userUpdates });

    return response.data as UserEntity;
  } catch (error) {
    throw new Error(error);
  }
};
