import {IUser} from '@utils/Types';
import {Dispatch} from 'redux';
import AuthService from '@services/AuthService';
export enum AuthActionTypes {
  AUTH_LOADING = 'authLoading',
  AUTH_ERROR = 'authError',
  LOGIN_SUCCESS = 'loginSuccess',
  REGISTER_SUCCESS = 'registerSuccess',
  LOGOUT_SUCCESS = 'logoutSuccess',
  CLEAR_ERROR = 'clearError',
  VALID_PERSISTED_TOKEN = 'checkPersistedToken',
}

interface AuthLoadingAction {
  type: AuthActionTypes.AUTH_LOADING;
}

interface AuthErrorAction {
  type: AuthActionTypes.AUTH_ERROR;
  payload: string;
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: {user: IUser; token: string};
}

interface LogoutSuccessAction {
  type: AuthActionTypes.LOGOUT_SUCCESS;
}
interface RegisterSuccessAction {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: any;
}

interface ClearErrorAction {
  type: AuthActionTypes.CLEAR_ERROR;
}

interface ValidPersistedToken {
  type: AuthActionTypes.VALID_PERSISTED_TOKEN;
}

export type AuthAction =
  | AuthLoadingAction
  | AuthErrorAction
  | LoginSuccessAction
  | ClearErrorAction
  | ValidPersistedToken
  | LogoutSuccessAction
  | RegisterSuccessAction;

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<AuthAction>) => {
    try {
      const res = await AuthService.login(email, password);
      const user = res.data.user;
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: {user, token: user.token},
      });
      return user;
    } catch (e) {
      console.log(e);
      dispatch({
        type: AuthActionTypes.AUTH_ERROR,
        payload: e.response.data.msg,
      });
    }
  };

export const register =
  (name: string, email: string, password: string, rol: string) =>
  async (dispatch: Dispatch<AuthAction>) => {
    try {
      console.log('aaa');
      const res = await AuthService.register(name, email, password, rol);
      dispatch({type: AuthActionTypes.REGISTER_SUCCESS, payload: res.data});
      return res.data;
    } catch (e) {
      console.log(e);
      dispatch({
        type: AuthActionTypes.AUTH_ERROR,
        payload: e.response.data.msg,
      });
    }
  };

export const logout = () => (dispatch: Dispatch<AuthAction>) => {
  dispatch({type: AuthActionTypes.LOGOUT_SUCCESS});
};
