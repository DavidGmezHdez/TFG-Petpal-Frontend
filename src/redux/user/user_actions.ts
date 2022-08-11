import {IUser} from '@utils/Types';
import {Dispatch} from 'redux';
import AuthService from '@services/AuthService';
import UserService from '@services/UserService';
export enum AuthActionTypes {
  AUTH_LOADING = 'authLoading',
  AUTH_ERROR = 'authError',
  LOGIN_SUCCESS = 'loginSuccess',
  REGISTER_SUCCESS = 'registerSuccess',
  LOGOUT_SUCCESS = 'logoutSuccess',
  CLEAR_ERROR = 'clearError',
  UPDATE_USER_SUCCESS = 'updateSuccess',
  UPDATE_USER_ERROR = 'updateError',
  VALID_PERSISTED_TOKEN = 'checkPersistedToken',
  UPDATE_USER_IMAGE_SUCCESS = 'updateImageSuccess',
  FETCH_SUCCESS_ACTION = 'fetchSuccessAction',
  FETCH_SUCCESS_ERROR = 'fetchErrorAction',
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

interface UpdateSuccessAction {
  type: AuthActionTypes.UPDATE_USER_SUCCESS;
  payload: {user: IUser};
}

interface UpdateErrorAction {
  type: AuthActionTypes.UPDATE_USER_ERROR;
  payload: any;
}

interface UpdateImageSuccessAction {
  type: AuthActionTypes.UPDATE_USER_IMAGE_SUCCESS;
  payload: {image: any};
}

interface ClearErrorAction {
  type: AuthActionTypes.CLEAR_ERROR;
}

interface ValidPersistedToken {
  type: AuthActionTypes.VALID_PERSISTED_TOKEN;
}

interface FetchSuccessAction {
  type: AuthActionTypes.FETCH_SUCCESS_ACTION;
  payload: {user: IUser};
}

interface FetchErrorAction {
  type: AuthActionTypes.FETCH_SUCCESS_ERROR;
  payload: any;
}

export type AuthAction =
  | AuthLoadingAction
  | AuthErrorAction
  | LoginSuccessAction
  | ClearErrorAction
  | ValidPersistedToken
  | LogoutSuccessAction
  | RegisterSuccessAction
  | UpdateSuccessAction
  | UpdateImageSuccessAction
  | UpdateErrorAction
  | FetchSuccessAction
  | FetchErrorAction;

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<AuthAction>) => {
    try {
      const res = await AuthService.login(email, password);
      const user = res.data.user;
      console.log('USER ACTION', user);
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: {user, token: user.token},
      });
      dispatch({
        type: AuthActionTypes.CLEAR_ERROR,
      });
      return user;
    } catch (e) {
      console.log(e);
      dispatch({
        type: AuthActionTypes.AUTH_ERROR,
        payload: e.response.data.message,
      });
    }
  };

export const register =
  (user: FormData, rol: string) => async (dispatch: Dispatch<AuthAction>) => {
    try {
      const res = await AuthService.register(user, rol);
      dispatch({type: AuthActionTypes.REGISTER_SUCCESS, payload: res.data});
      dispatch({
        type: AuthActionTypes.CLEAR_ERROR,
      });
      return res.data;
    } catch (e) {
      console.log(e);
      dispatch({
        type: AuthActionTypes.AUTH_ERROR,
        payload: e.response.data.message,
      });
    }
  };

export const logout = () => (dispatch: Dispatch<AuthAction>) => {
  dispatch({type: AuthActionTypes.LOGOUT_SUCCESS});
};

export const updateUser =
  (userId: string, user: any, rol: string) =>
  async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({
        type: AuthActionTypes.AUTH_LOADING,
      });
      const res = await UserService.updateUser(userId, user, rol);
      const updatedUser = res.data;
      dispatch({
        type: AuthActionTypes.UPDATE_USER_SUCCESS,
        payload: {user: updatedUser},
      });
      dispatch({
        type: AuthActionTypes.CLEAR_ERROR,
      });
      return updatedUser;
    } catch (e) {
      console.log(e);
      dispatch({
        type: AuthActionTypes.UPDATE_USER_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };

export const updateUserProfile =
  (userId: string, user: any, rol: string) =>
  async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({
        type: AuthActionTypes.AUTH_LOADING,
      });
      const res = await UserService.updateUserProfile(userId, user, rol);
      const updatedUser = res.data;
      dispatch({
        type: AuthActionTypes.UPDATE_USER_SUCCESS,
        payload: {user: updatedUser},
      });
      dispatch({
        type: AuthActionTypes.CLEAR_ERROR,
      });
      return updatedUser;
    } catch (e) {
      console.log(e);
      dispatch({
        type: AuthActionTypes.UPDATE_USER_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };

export const updateUserProfileImage =
  (userId: string, user: any, rol: string) =>
  async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch({
        type: AuthActionTypes.AUTH_LOADING,
      });
      const res = await UserService.updateUserProfile(userId, user, rol);
      const image = res.data;
      dispatch({
        type: AuthActionTypes.UPDATE_USER_IMAGE_SUCCESS,
        payload: {image: image},
      });
      dispatch({
        type: AuthActionTypes.CLEAR_ERROR,
      });
      return image;
    } catch (e) {
      console.log(e);
      dispatch({
        type: AuthActionTypes.UPDATE_USER_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };

export const fetchUser =
  (userId: string, rol: string) => async (dispatch: Dispatch<AuthAction>) => {
    try {
      const res = await UserService.fetchUser(userId, rol);
      const user = res.data;
      dispatch({
        type: AuthActionTypes.FETCH_SUCCESS_ACTION,
        payload: {user},
      });
      dispatch({
        type: AuthActionTypes.CLEAR_ERROR,
      });
      return user;
    } catch (e) {
      console.log(e);
      dispatch({
        type: AuthActionTypes.FETCH_SUCCESS_ERROR,
        payload: e.response.data.message,
      });
    }
  };

export const clearErrorUser = () => (dispatch: Dispatch<AuthAction>) => {
  dispatch({
    type: AuthActionTypes.CLEAR_ERROR,
  });
};
