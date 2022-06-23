import {IPost} from '@utils/Types';
import {Dispatch} from 'redux';
import PostsService from '@services/PostsService';
export enum PostsActionTypes {
  POSTS_LOADING = 'postsLoading',
  POST_ERROR = 'postsError',
  POSTS_SUCCESS = 'postsSuccess',
  SEND_POSTS_SUCCESS = 'sendPostsSuccess',
  CLEAR_ERROR = 'clearError',
}

interface PostsLoadingAction {
  type: PostsActionTypes.POSTS_LOADING;
}

interface PostsErrorAction {
  type: PostsActionTypes.POST_ERROR;
  payload: string;
}

interface PostsSuccessAction {
  type: PostsActionTypes.POSTS_SUCCESS;
  payload: {posts: IPost[]};
}

interface SendPostsSuccessAction {
  type: PostsActionTypes.SEND_POSTS_SUCCESS;
  payload: {post: IPost};
}

interface ClearErrorAction {
  type: PostsActionTypes.CLEAR_ERROR;
}

export type PostsAction =
  | PostsLoadingAction
  | PostsErrorAction
  | PostsSuccessAction
  | ClearErrorAction
  | SendPostsSuccessAction;

export const fetchPosts = () => async (dispatch: Dispatch<PostsAction>) => {
  try {
    dispatch({
      type: PostsActionTypes.POSTS_LOADING,
    });
    const res = await PostsService.fetchPosts();
    const post = res.data;
    console.log(res.data);
    dispatch({
      type: PostsActionTypes.SEND_POSTS_SUCCESS,
      payload: {post},
    });
    return post;
  } catch (e) {
    console.log(e);
    dispatch({
      type: PostsActionTypes.POST_ERROR,
      payload: e.response.data.msg,
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
      console.log({res});
      const posts = res.data;
      console.log(res.data);
      // dispatch({
      //   type: PostsActionTypes.POSTS_SUCCESS,
      //   payload: {posts},
      // });
      return posts;
    } catch (e) {
      console.log(e);
      dispatch({
        type: PostsActionTypes.POST_ERROR,
        payload: e.response.data.msg,
      });
    }
  };
