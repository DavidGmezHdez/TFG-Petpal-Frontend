import {setAuthorizationToken} from '../../utils/api/axios';
import {UserActions} from './user_types';

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const reducer = (action: any = {}, state = initialState) => {
  console.log({action, state});
  switch (action.type) {
    case UserActions.LOADING:
      return {
        ...state,
        loading: true,
      };

    case UserActions.LOGIN_SUCCESS:
      setAuthorizationToken(action.payload.token);
      console.log('AAaaaas');
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case UserActions.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        msg: action.payload.msg,
        isAuthenticated: false,
      };
    case UserActions.REGISTER_SUCCESS:
      console.log('REGISTER');
      return {
        ...state,
        loading: false,
        success: true,
      };
    case UserActions.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        msg: action.payload.msg,
        success: false,
      };
    case UserActions.LOGOUT:
      setAuthorizationToken('');
      return initialState;

    default:
      return state;
  }
};

export default reducer;
