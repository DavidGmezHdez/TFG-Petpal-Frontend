import {combineReducers} from 'redux';
import userReducer from '@redux/user/user_reducer';
import postsReducer from '@redux/posts/posts_reducer';

export default combineReducers({user: userReducer, posts: postsReducer});
