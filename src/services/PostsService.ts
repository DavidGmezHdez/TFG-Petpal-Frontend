import axios from '@utils/api/axios';

const fetchPosts = async () => {
  return await axios.get('/posts');
};

export default {
  fetchPosts,
};
