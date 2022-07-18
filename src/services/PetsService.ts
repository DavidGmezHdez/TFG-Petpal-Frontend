import axios from '@utils/api/axios';

const fetchPets = async (params: any) => {
  return await axios.get('/pets', {params});
};

const sendPet = async (pet: any) => {
  return await axios.post('/pets', pet, {
    headers: {
      'content-type': 'multipart/form-data',
    },
    transformRequest: (data: any) => {
      return data;
    },
  });
};

const updatePet = async (petId: string, pet: any) => {
  return await axios.patch(`/pets/${petId}`, {pet: pet});
};

const deletePet = async (petId: string) => {
  return await axios.delete(`/pets/${petId}`);
};

export default {
  fetchPets,
  sendPet,
  updatePet,
  deletePet,
};
