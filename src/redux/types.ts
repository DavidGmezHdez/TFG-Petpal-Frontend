import {IPost, IUser, IEvent} from '@utils/Types';
export interface AuthState {
  token: string;
  user: IUser;
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

export interface EventsState {
  events: IEvent[];
  isLoading: boolean;
  error: boolean;
  msg: string;
}
