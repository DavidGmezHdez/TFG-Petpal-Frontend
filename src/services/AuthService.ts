import axios from '@utils/api/axios';

const login = async (email: string, password: string) => {
  console.log({axios});
  return await axios.post('/auth/user/login', {email, password});
};

const register = async (name: string, email: string, password: string) => {
  return await axios.post('/auth/user/register', {name, email, password});
};

export default {
  login,
  register,
};
