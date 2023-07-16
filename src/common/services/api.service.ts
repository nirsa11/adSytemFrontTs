import { AxiosInstance, AxiosResponse } from 'axios';
import { AxiosService } from './axios.service';
import { LoginPageState } from '../types/interface/state/authState.interface';
import { UserEntity } from '../types/entities/user.entity';
import { setCookies } from '../utils';
import { CampaignEntity } from '../types/entities/campagin.entity';
import { CompanyEntity } from '../types/entities/company.entity';

const httpRequest: AxiosInstance = new AxiosService().getClient();

/**
 * Logs in the user by sending a POST request to the server with the provided email and password.
 * @param {LoginPageState} LoginPageState - An object containing the email and password of the user.
 * @returns {Promise} A promise that resolves with the user's data if the login is successful, or rejects with an error if the login fails.
 * @throws {Error} If there is an error with the request.
 */

export const ApiLogin = async ({ email, password }: LoginPageState) => {
  try {
    const response = await httpRequest.post('/users/login', { email, password });

    setLoginCookies(response.data.accessToken);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Registers a new user by sending a POST request to the server with the user's data.
 * @param {UserEntity} data - The user's data to be sent to the server.
 * @returns {Promise<UserEntity>} - A promise that resolves with the user's data if the registration is successful.
 * @throws {Error} - If there is an error during the registration process.
 */
export const ApiUserRegister = async (data: UserEntity): Promise<UserEntity> => {
  try {
    const response = await httpRequest.post('/users/register', data);

    setLoginCookies(response.data.accessToken);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const ApiCompanyRegister = async (data: CompanyEntity): Promise<CompanyEntity> => {
  try {
    const response = await httpRequest.post('/companies/register', data);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Sends a PATCH request to the server to update a user's information.
 * @param {UserEntity} data - The updated user information to send to the server.
 * @returns {Promise<UserEntity>} - A promise that resolves with the updated user information.
 * @throws {Error} - If there is an error with the request.
 */
export const ApiEditUser = async (data: UserEntity): Promise<UserEntity> => {
  try {
    const response = await httpRequest.patch('/users', data);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Sends a request to reset the user's password via email.
 * @param {Object} param - An object containing the user's email address.
 * @param {string} param.email - The email address of the user.
 * @returns {Promise<UserEntity>} A promise that resolves with the user entity object if the request is successful.
 * @throws {Error} If the request fails, an error is thrown.
 */
export const ApiResetEmail = async ({ email }: { email: string }): Promise<UserEntity> => {
  try {
    const response = await httpRequest.post('/users/forgotpassword', { email });

    setLoginCookies(response.data.accessToken);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Checks if the given token is valid by making a GET request to the '/users/forgotpasswordtoken'
 * endpoint with the token as a parameter. If the response status is 200, sets the login cookies
 * and returns true. Otherwise, returns false.
 * @param {string} token - the token to check
 * @returns {Promise<boolean>} - a promise that resolves to true if the token is valid, false otherwise
 * @throws {Error} - if there is an error making the API request
 */
export const ApicheckToken = async ({ token }: { token: string }): Promise<boolean> => {
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

/**
 * Updates a user's information with the given updates.
 * @param {Partial<UserEntity>} userUpdates - An object containing the updates to apply to the user.
 * @returns {Promise<UserEntity>} - A promise that resolves with the updated user object.
 * @throws {Error} - If there is an error updating the user.
 */
export const ApiUpdateUser = async (userUpdates: Partial<UserEntity>): Promise<UserEntity> => {
  try {
    const response: AxiosResponse<any, any> = await httpRequest.put('/users', { ...userUpdates });

    return response.data as UserEntity;
  } catch (error) {
    throw new Error(error);
  }
};

export const ApiAddCampaign = async (
  campaignPayload: Omit<CampaignEntity, 'id'>
): Promise<CampaignEntity> => {
  try {
    const response: AxiosResponse<any, any> = await httpRequest.post('/campaigns', {
      ...campaignPayload
    });

    return response.data as CampaignEntity;
  } catch (error) {
    throw new Error(error);
  }
};

export const ApiUpdateCampaign = async (
  campaignPayload: CampaignEntity
): Promise<CampaignEntity> => {
  try {
    const response: AxiosResponse<any, any> = await httpRequest.patch(
      `/campaigns/${campaignPayload.id}`,
      {
        ...campaignPayload
      }
    );

    return response.data as CampaignEntity;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCampaignApi = async (id: number): Promise<boolean> => {
  try {
    const response: AxiosResponse<any, any> = await httpRequest.delete(`/campaigns/${id}`);

    return response.data.status === 200;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates the complete user entity with the given updates.
 * @param {Partial<UserEntity>} userUpdates - The updates to apply to the user entity.
 * @returns {Promise<UserEntity>} - The updated user entity.
 * @throws {Error} - If there is an error updating the user entity.
 */
export const updateCompleteUser = async (userUpdates: Partial<UserEntity>): Promise<UserEntity> => {
  try {
    const response: AxiosResponse<any, any> = await httpRequest.patch('/users', { ...userUpdates });

    return response.data as UserEntity;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Sets the login cookies for the user with the given access token.
 * @param {string} accessToken - The access token to set as a cookie.
 * @returns None
 */
export const setLoginCookies = (accessToken: string) => {
  const seventDays = new Date().getTime() + 360000 * 24 * 60 * 7;

  setCookies('accessToken', accessToken, seventDays);

  setCookies('tokenTime', seventDays.toString(), seventDays);
};
