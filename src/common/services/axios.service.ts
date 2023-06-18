'@ts-nocheck';
import axios, { AxiosInstance, AxiosStatic, CreateAxiosDefaults } from 'axios';
import Cookies from 'universal-cookie';
import store from '../../redux/store';
import { setCookies } from '../utils/index';
import { setLoader } from '../../redux/loaderSlice';
export class AxiosService {
  private baseUrl: string = window.location.href.includes('localhost')
    ? 'http://localhost:4000/api/v1'
    : 'https://us-central1-adsystem-388212.cloudfunctions.net/api/v1';
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
    // if (new Date().getTime() > tokenTime) {
    //   const token = await firebase.getAuth().currentUser.getIdToken(true);

    //   console.log("token", token);

    //   setCookies(
    //     "token",
    //     token,
    //     new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime()
    //   );

    //   const timeHourString: string = new Date(Date.now() + 360000)
    //     .getTime()
    //     .toString();

    //   setCookies(
    //     "token-time",
    //     timeHourString,
    //     new Date(Date.now() + 360000).getTime()
    //   );

    //   return `Bearer ${token}` || "";
    // } else {
    //   return `Bearer ${cookies.get("token")}` || "";
    // }
  }
}
