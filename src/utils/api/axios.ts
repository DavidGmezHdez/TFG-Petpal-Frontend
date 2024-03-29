import axios, {AxiosRequestConfig} from 'axios';
import {store} from '@redux/store';
import * as envConfig from '../../../config';

const instance = axios.create({
  baseURL: envConfig.default.apiUrl,
  timeout: 10000,
  headers: {
    'Content-type': 'application/json',
  },
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const state = store.getState();
  const token = state.user.token;
  config.headers!.Authorization = `Bearer ${token}`;
  config.timeout = 10000;
  return config;
});

export const setAuthorizationToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default instance;
