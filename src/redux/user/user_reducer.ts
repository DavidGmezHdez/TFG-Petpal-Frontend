import {RootState} from '@redux/store';
import {AuthState} from '@redux/types';
import {setAuthorizationToken} from '../../utils/api/axios';
import {AuthAction, AuthActionTypes} from './user_actions';

const initialState: AuthState = {
  token: '',
  user: {
    _id: '',
    token: '',
    name: '',
    password: '',
    attendingEvents: [],
    posts: [],
    likedPosts: [],
    pets: [],
    email: '',
    rol: '',
    hostEvents: [],
    direction: '',
    contactPhone: '',
    availablePets: [],
    region: '',
    image: '',
    imageKey: '',
    promoted: false,
  },
  isAuthenticated: false,
  isLoading: false,
  error: false,
  msg: '',
};

const reducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case AuthActionTypes.AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        msg: action.payload,
      };

    case AuthActionTypes.LOGOUT_SUCCESS:
      return initialState;

    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: false,
        msg: '',
        isLoading: false,
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      setAuthorizationToken(action.payload.token);
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case AuthActionTypes.UPDATE_USER_SUCCESS:
      const updatedUser = action.payload.user;
      return {
        ...state,
        isLoading: false,
        user: {...state.user, ...updatedUser},
      };
    case AuthActionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        msg: action.payload.msg,
      };

    case AuthActionTypes.FETCH_SUCCESS_ACTION:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case AuthActionTypes.FETCH_SUCCESS_ERROR:
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

export const getUser = (state: RootState) => state.user.user;
export const getLoadingUser = (state: RootState) => state.user.isLoading;
export const getToken = (state: RootState) => state.user.token;
export const getUserError = (state: RootState) => state.user.error;
export const getUserErrorMsg = (state: RootState) => state.user.msg;
export default reducer;
