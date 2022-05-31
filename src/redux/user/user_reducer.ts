import {setAuthorizationToken} from '../../utils/api/axios';
import {UserActions} from './user_types';

const initialState = {
  name: '',
  email: '',
  token: '',
  loading: false,
  isAuthenticated: false,
};

const reducer = (action: any = {}, state = initialState) => {
  switch (action.type) {
    case UserActions.LOADING:
      return {
        ...state,
        loading: true,
      };

    case UserActions.LOGIN_SUCCESS:
      setAuthorizationToken(action.payload.token);
      return {
        ...state,
        loading: false,
        name: action.payload.username,
        token: action.payload.token,
        isAuthenticated: true,
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
      return {
        ...state,
        loading: false,
      };
    case UserActions.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        msg: action.payload.msg,
      };
    case UserActions.LOGOUT:
      setAuthorizationToken('');
      return initialState;

    default:
      return state;
  }
};

export default reducer;
