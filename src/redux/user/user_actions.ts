import {Dispatch} from 'redux';
import AuthService from '@services/AuthService';
import {UserActions} from './user_types';

export const login =
  (email: string, password: string) => async (dispatch: Dispatch<any>) => {
    try {
      const res = await AuthService.login(email, password);
      dispatch({type: UserActions.LOGIN_SUCCESS, payload: res.data.user});
      console.log(res);
      return res.data.user;
    } catch (e) {
      console.log(e);
      dispatch({type: UserActions.LOGIN_ERROR, payload: {msg: e}});
    }
  };

export const register =
  (name: string, email: string, password: string, rol: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const res = await AuthService.register(name, email, password, rol);
      dispatch({type: UserActions.REGISTER_SUCCESS, payload: res.data});
      return res.data;
    } catch (e) {
      dispatch({type: UserActions.REGISTER_ERROR, payload: {msg: e}});
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  dispatch({type: UserActions.LOGOUT});
};
