import {Dispatch} from 'redux';
import PostsService from '@services/PostsService';
export enum PostsActionTypes {
  POSTS_LOADING = 'postsLoading',
  POST_ERROR = 'postsError',
  POSTS_SUCCESS = 'postsSuccess',
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
  payload: {posts: any};
}

interface ClearErrorAction {
  type: PostsActionTypes.CLEAR_ERROR;
}

export type PostsAction =
  | PostsLoadingAction
  | PostsErrorAction
  | PostsSuccessAction
  | ClearErrorAction;

export const fetchPosts = () => async (dispatch: Dispatch<PostsAction>) => {
  try {
    dispatch({
      type: PostsActionTypes.POSTS_LOADING,
    });
    const res = await PostsService.fetchPosts();
    const posts = res.data;
    console.log(res.data);
    dispatch({
      type: PostsActionTypes.POSTS_SUCCESS,
      payload: {posts},
    });
    return posts;
  } catch (e) {
    console.log(e);
    dispatch({
      type: PostsActionTypes.POST_ERROR,
      payload: e.response.data.msg,
    });
  }
};
