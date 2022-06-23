import axios from '@utils/api/axios';

const fetchPosts = async () => {
  return await axios.get('/posts');
};

const sendPost = async (post: any) => {
  return await axios.post('/posts', {data: {post: post}});
};

export default {
  fetchPosts,
  sendPost,
};
