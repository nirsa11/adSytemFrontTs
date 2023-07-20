'@ts-nocheck';
import axios, { AxiosInstance, AxiosStatic, CreateAxiosDefaults } from 'axios';
import Cookies from 'universal-cookie';
import store from '../../redux/store';
import { setCookies } from '../utils/index';
import { setLoader } from '../../redux/loaderSlice';
/**
 * A class that provides an Axios client for making HTTP requests.
 */
export class AxiosService {
  private baseUrl: string = "http://localhost:4000/api/v1"
  // private baseUrl: string = "https://us-central1-adsystem-388212.cloudfunctions.net/api/v1"
  public client: AxiosInstance;
  constructor() {
    this.configAxiosInstance();
  }
  private configAxiosInstance(): AxiosInstance {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        withCredentials: true,
        Authorization: ''
      }
    };
    this.client = axios.create(config);
    let that = this;
    this.client.interceptors.request.use(
      async function (config) {
        config.headers['Authorization'] = await that.getToken();
        config.headers.Accept = 'application/json';
        store.dispatch(setLoader(true));
        return config;
      },
      function (error) {
        store.dispatch(setLoader(false));
        return Promise.reject(error);
      }
    );
    this.client.interceptors.response.use(
      (response) => {
        console.log('Intercepting the response before sending it', response);
        store.dispatch(setLoader(false));
        return response;
      },
      (error) => {
        console.log('Response  Errorssss: ', error);
        store.dispatch(setLoader(false));
        return Promise.reject(
          (error && error?.response?.data?.message) || error?.response?.data?.message
        );
      }
    );
    return this.client;
  }
  public getClient() {
    return this.client;
  }
  private async getToken(): Promise<string> {
    const cookies = new Cookies();
    const tokenExpire: string = cookies.get('token-time');
    const tokenTime = parseInt(tokenExpire);
    return `Bearer ${cookies.get('accessToken')}` || '';
  }
}