import axios from 'axios';
import config from '../../../config';

const instance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

console.log(config.apiUrl);

export const setAuthorizationToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default instance;
