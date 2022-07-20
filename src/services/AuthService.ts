import axios from '@utils/api/axios';

const login = async (email: string, password: string) => {
  return await axios.post('/auth/login', {email, password});
};

const register = async (user: FormData, rol: string) => {
  const apiURL =
    rol === 'Usuario' ? '/auth/user/register' : '/auth/protector/register';

  return await axios.post(apiURL, user, {
    headers: {
      'content-type': 'multipart/form-data',
    },
    transformRequest: (data: any) => {
      return data;
    },
  });
};

export default {
  login,
  register,
};
