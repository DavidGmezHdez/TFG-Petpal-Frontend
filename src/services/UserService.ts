import axios from '@utils/api/axios';

const updateUser = async (userId: string, user: any, rol: string) => {
  if (rol === 'Usuario') {
    return await axios.patch(`/users/${userId}`, {user: user});
  } else {
    return await axios.patch(`/protectors/${userId}`, {protector: user});
  }
};

export default {
  updateUser,
};
