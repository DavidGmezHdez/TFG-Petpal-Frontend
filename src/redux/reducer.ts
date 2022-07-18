import {combineReducers} from 'redux';
import userReducer from '@redux/user/user_reducer';
import postsReducer from '@redux/posts/posts_reducer';
import eventsReducer from '@redux/events/events_reducer';
import petsReducer from '@redux/pets/pets_reducer';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  events: eventsReducer,
  pets: petsReducer,
});
