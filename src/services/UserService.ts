import axios from '@utils/api/axios';

const updateUser = async (userId: string, user: any) => {
  return await axios.patch(`/users/${userId}`, {user: user});
};

export default {
  updateUser,
};
