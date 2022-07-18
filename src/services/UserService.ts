import axios from '@utils/api/axios';

const updateUser = async (userId: string, user: any, rol: string) => {
  if (rol === 'Usuario') {
    return await axios.patch(`/users/${userId}`, {user});
  } else {
    console.log('AAA', user);
    return await axios.patch(`/protectors/${userId}`, {protector: user});
  }
};

const updateUserProfile = async (userId: string, user: any, rol: string) => {
  console.log(userId);
  if (rol === 'Usuario') {
    return await axios.post(`/users/${userId}`, user, {
      headers: {
        'content-type': 'multipart/form-data',
      },
      transformRequest: (data: any) => {
        return data;
      },
    });
  } else {
    return await axios.post(`/protectors/${userId}`, user, {
      headers: {
        'content-type': 'multipart/form-data',
      },
      transformRequest: (data: any) => {
        return data;
      },
    });
  }
};

export default {
  updateUser,
  updateUserProfile,
};
