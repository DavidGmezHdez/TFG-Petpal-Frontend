import axios from '@utils/api/axios';

const fetchPets = async (params: any) => {
  console.log('SERIVCE PARAMS', params);
  return await axios.get('/pets', {params});
};

const sendPet = async (pet: any) => {
  return await axios.post('/pets', {pet: pet});
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
