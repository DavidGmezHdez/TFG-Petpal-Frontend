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

    case PostsActionTypes.POST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        msg: action.payload,
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

    default:
      return state;
  }
};

export const getPosts = (state: RootState) => state.posts.posts;
export const getLoadingPosts = (state: RootState) => state.posts.isLoading;
export default reducer;
