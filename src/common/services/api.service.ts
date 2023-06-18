import { AxiosInstance, AxiosResponse } from 'axios';
import { AxiosService } from './axios.service';
import { LoginPageState, RegisterPageState } from '../types/interface/state/authState.interface';
import { UserEntity } from '../types/entities/user.entity';
import { setCookies } from '../utils';

const httpRequest: AxiosInstance = new AxiosService().getClient();

export const ApiLogin = async ({ email, password }: LoginPageState) => {
  try {
    const response = await httpRequest.post('/users/login', { email, password });

    setLoginCookies(response.data.accessToken);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const ApiRegister = async (data: UserEntity): Promise<UserEntity> => {
  try {
    const response = await httpRequest.post('/users/register', data);

    setLoginCookies(response.data.accessToken);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const ApiEditUser = async (data: UserEntity): Promise<UserEntity> => {
  try {
    const response = await httpRequest.patch('/users', data);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const ApiResetEmail = async ({ email }: { email: string }): Promise<UserEntity> => {
  try {
    const response = await httpRequest.post('/users/forgotpassword', { email });

    setLoginCookies(response.data.accessToken);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const checkTokenApi = async ({ token }: { token: string }): Promise<boolean> => {
  try {
    const response = await httpRequest.get('/users/forgotpasswordtoken', { params: { token } });

    if (response.status === 200) {
      setLoginCookies(response.data.accessToken);
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

export const updateCompleteUser = async (userUpdates: Partial<UserEntity>): Promise<UserEntity> => {
  try {
    const response: AxiosResponse<any, any> = await httpRequest.patch('/users', { ...userUpdates });

    return response.data as UserEntity;
  } catch (error) {
    throw new Error(error);
  }
};

export const setLoginCookies = (accessToken: string) => {
  const seventDays = new Date().getTime() + 360000 * 24 * 60 * 7;

  setCookies('accessToken', accessToken, seventDays);

  setCookies('tokenTime', seventDays.toString(), seventDays);
};
