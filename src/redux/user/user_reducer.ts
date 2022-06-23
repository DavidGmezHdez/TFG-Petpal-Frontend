import {RootState} from '@redux/store';
import {AuthState} from '@redux/types';
import {setAuthorizationToken} from '../../utils/api/axios';
import {AuthAction, AuthActionTypes} from './user_actions';

const initialState: AuthState = {
  token: '',
  user: {},
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
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isLoading: false,
        error: false,
        msg: '',
      };

    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: false,
        msg: '',
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

    default:
      return state;
  }
};

export const getUser = (state: RootState) => state.user.user;
export default reducer;
