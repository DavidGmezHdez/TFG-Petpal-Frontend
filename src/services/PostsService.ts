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

const deletePost = async (postId: string) => {
  return await axios.delete(`/posts/${postId}`);
};

const sendComment = async (postId: string, post: any) => {
  return await axios.patch(`/posts/comment/${postId}`, {comment: post});
};

const deleteComment = async (postId: string, commentId: string) => {
  return await axios.delete(`/posts/comment/${postId}`, {
    data: {commentId: commentId},
  });
};

export default {
  fetchPosts,
  sendPost,
  updatePost,
  deletePost,
  sendComment,
  deleteComment,
};
