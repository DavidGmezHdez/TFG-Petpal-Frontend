import axios from '@utils/api/axios';

const updateUser = async (userId: string, user: any, rol: string) => {
  const apiURL =
    rol === 'Usuario' ? `/users/${userId}` : `/protectors/${userId}`;
  const body = rol === 'Usuario' ? {user} : {protector: user};
  return await axios.patch(apiURL, body);
};

const updateUserProfile = async (userId: string, user: any, rol: string) => {
  const apiURL =
    rol === 'Usuario' ? `/users/${userId}` : `/protectors/${userId}`;
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
  updateUser,
  updateUserProfile,
};
