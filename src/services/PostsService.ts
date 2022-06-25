import axios from '@utils/api/axios';

const fetchPosts = async () => {
  return await axios.get('/posts');
};

const sendPost = async (post: any) => {
  return await axios.post('/posts', {post: post});
};

const updatePost = async (postId: string, post: any) => {
  return await axios.patch(`/posts/${postId}`, {post: post});
};

export default {
  fetchPosts,
  sendPost,
  updatePost,
};
