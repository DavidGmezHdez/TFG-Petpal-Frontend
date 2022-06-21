import axios from '@utils/api/axios';

const login = async (email: string, password: string) => {
  return await axios.post('/auth/login', {email, password});
};

const register = async (
  name: string,
  email: string,
  password: string,
  rol: string,
) => {
  if (rol === 'Usuario') {
    return await axios.post('/auth/user/register', {name, email, password});
  } else {
    return await axios.post('/auth/protector/register', {
      name,
      email,
      password,
    });
  }
};

export default {
  login,
  register,
};
