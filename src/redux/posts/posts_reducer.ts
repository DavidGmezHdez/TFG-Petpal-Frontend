import {RootState} from '@redux/store';
import {PostsState} from '@redux/types';
import {PostsAction, PostsActionTypes} from './posts_actions';

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: false,
  msg: '',
};

const reducer = (state: PostsState = initialState, action: PostsAction) => {
  console.log({action});
  switch (action.type) {
    case PostsActionTypes.POSTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case PostsActionTypes.POST_ERROR_FETCH:
      return {
        ...state,
        isLoading: false,
        error: true,
        posts: [],
        msg: action.payload.msg,
      };

    case PostsActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: false,
        msg: '',
      };

    case PostsActionTypes.POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload.posts,
      };
    case PostsActionTypes.SEND_POSTS_SUCCESS:
      const post = action.payload.post;
      return {
        ...state,
        isLoading: false,
        posts: [post, ...state.posts],
      };
    case PostsActionTypes.SEND_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};

export const getPosts = (state: RootState) => state.posts.posts;
export const getLoadingPosts = (state: RootState) => state.posts.isLoading;
export const getErrorPosts = (state: RootState) => state.posts.error;
export const getMessagePosts = (state: RootState) => state.posts.msg;
export default reducer;
