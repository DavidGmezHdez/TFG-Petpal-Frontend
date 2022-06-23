import {IPost} from '@utils/Types';
export interface AuthState {
  token: string;
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: boolean;
  msg: string;
}

export interface PostsState {
  posts: IPost[];
  isLoading: boolean;
  error: boolean;
  msg: string;
}
