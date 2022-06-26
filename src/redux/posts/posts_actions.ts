import {IPost} from '@utils/Types';
import {Dispatch} from 'redux';
import PostsService from '@services/PostsService';
export enum PostsActionTypes {
  POSTS_LOADING = 'postsLoading',
  POST_ERROR_FETCH = 'postsErrorFetch',
  POSTS_SUCCESS = 'postsSuccess',
  SEND_POSTS_SUCCESS = 'sendPostsSuccess',
  SEND_POSTS_ERROR = 'sendPostsError',
  UPDATE_POST_SUCCESS = 'updatePostsSuccess',
  UPDATE_POSTS_ERROR = 'updatePostsError',
  DELETE_POSTS_SUCCESS = 'deletePostsSuccess',
  DELETE_POSTS_ERROR = 'deletePostsError',
  CLEAR_ERROR = 'clearError',
}

interface PostsLoadingAction {
  type: PostsActionTypes.POSTS_LOADING;
}

interface PostsErrorAction {
  type: PostsActionTypes.POST_ERROR_FETCH;
  payload: any;
}

interface PostsSuccessAction {
  type: PostsActionTypes.POSTS_SUCCESS;
  payload: {posts: IPost[]};
}

interface SendPostsSuccessAction {
  type: PostsActionTypes.SEND_POSTS_SUCCESS;
  payload: {post: IPost};
}

interface SendPostError {
  type: PostsActionTypes.SEND_POSTS_ERROR;
  payload: any;
}

interface UpdatePostsSuccessAction {
  type: PostsActionTypes.UPDATE_POST_SUCCESS;
  payload: {post: IPost};
}
interface UpdatePostError {
  type: PostsActionTypes.UPDATE_POSTS_ERROR;
  payload: any;
}

interface DeletePostsSuccessAction {
  type: PostsActionTypes.DELETE_POSTS_SUCCESS;
  payload: {post: IPost};
}
interface DeletePostError {
  type: PostsActionTypes.DELETE_POSTS_ERROR;
  payload: any;
}

interface ClearErrorAction {
  type: PostsActionTypes.CLEAR_ERROR;
}

export type PostsAction =
  | PostsLoadingAction
  | PostsErrorAction
  | PostsSuccessAction
  | ClearErrorAction
  | SendPostsSuccessAction
  | SendPostError
  | UpdatePostsSuccessAction
  | UpdatePostError
  | DeletePostsSuccessAction
  | DeletePostError;

export const fetchPosts = () => async (dispatch: Dispatch<PostsAction>) => {
  try {
    dispatch({
      type: PostsActionTypes.POSTS_LOADING,
    });
    const res = await PostsService.fetchPosts();
    const posts = res.data;
    dispatch({
      type: PostsActionTypes.POSTS_SUCCESS,
      payload: {posts},
    });
    return posts;
  } catch (e) {
    console.log(e);
    dispatch({
      type: PostsActionTypes.POST_ERROR_FETCH,
      payload: {msg: e.response.data.message},
    });
  }
};

export const sendPost =
  (post: any) => async (dispatch: Dispatch<PostsAction>) => {
    try {
      dispatch({
        type: PostsActionTypes.POSTS_LOADING,
      });
      const res = await PostsService.sendPost(post);
      const createdPost = res.data;
      dispatch({
        type: PostsActionTypes.SEND_POSTS_SUCCESS,
        payload: {post: createdPost},
      });
      return createdPost;
    } catch (e) {
      console.log(e);
      dispatch({
        type: PostsActionTypes.SEND_POSTS_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };

export const updatePost =
  (postId: string, post: any) => async (dispatch: Dispatch<PostsAction>) => {
    try {
      dispatch({
        type: PostsActionTypes.POSTS_LOADING,
      });
      const res = await PostsService.updatePost(postId, post);
      const updatedPost = res.data;
      dispatch({
        type: PostsActionTypes.UPDATE_POST_SUCCESS,
        payload: {post: updatedPost},
      });
      return updatedPost;
    } catch (e) {
      console.log(e);
      dispatch({
        type: PostsActionTypes.UPDATE_POSTS_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };

export const deletePost =
  (postId: string) => async (dispatch: Dispatch<PostsAction>) => {
    try {
      dispatch({
        type: PostsActionTypes.POSTS_LOADING,
      });
      const res = await PostsService.deletePost(postId);
      const deletedPost = res.data;
      console.log(res);
      dispatch({
        type: PostsActionTypes.DELETE_POSTS_SUCCESS,
        payload: {post: deletedPost},
      });
      return deletedPost;
    } catch (e) {
      console.log(e);
      dispatch({
        type: PostsActionTypes.DELETE_POSTS_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };
