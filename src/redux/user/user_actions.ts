import {Dispatch} from 'redux';
import AuthService from '@services/AuthService';
import {UserActions} from './user_types';

export const login =
  async (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch({type: UserActions.LOADING});

    try {
      const res = await AuthService.login(email, password);
      dispatch({type: UserActions.CLEAR_ERROR});
      dispatch({type: UserActions.LOGIN_SUCCESS, payload: res.data});
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      dispatch({type: UserActions.LOGIN_ERROR, payload: {msg: e}});
    }
  };

export const register =
  (name: string, email: string, password: string, rol: string) =>
  async (dispatch: Dispatch<any>) => {
    dispatch({type: UserActions.LOADING});

    try {
      const res = await AuthService.register(name, email, password, rol);
      dispatch({type: UserActions.CLEAR_ERROR});
      dispatch({type: UserActions.REGISTER_SUCCESS, payload: res.data});
      return res.data;
    } catch (e) {
      dispatch({type: UserActions.REGISTER_ERROR, payload: {msg: e}});
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  dispatch({type: UserActions.LOGOUT});
};
