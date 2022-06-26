import {IEvent} from '@utils/Types';
import {RootState} from '@redux/store';
import {EventsState} from '@redux/types';
import {EventsActions, EventsActionTypes} from './events_actions';

const initialState: EventsState = {
  events: [],
  isLoading: false,
  error: false,
  msg: '',
};

const reducer = (state: EventsState = initialState, action: EventsActions) => {
  switch (action.type) {
    case EventsActionTypes.EVENTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case EventsActionTypes.EVENTS_ERROR_FETCH:
      return {
        ...state,
        isLoading: false,
        error: true,
        events: [],
        msg: action.payload.msg,
      };

    case EventsActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: false,
        msg: '',
      };

    case EventsActionTypes.EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: action.payload.events,
      };
    case EventsActionTypes.SEND_EVENTS_SUCCESS:
      const createdEvent = action.payload.event;
      return {
        ...state,
        isLoading: false,
        events: [createdEvent, ...state.events],
      };
    case EventsActionTypes.SEND_EVENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        msg: action.payload.msg,
      };

    case EventsActionTypes.UPDATE_EVENT_SUCCESS:
      const updatedEvent = action.payload.event;
      return {
        ...state,
        isLoading: false,
        events: [
          ...state.events.map((evt: IEvent) =>
            evt._id === updatedEvent._id ? updatedEvent : evt,
          ),
        ],
      };

    case EventsActionTypes.UPDATE_EVENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        msg: action.payload.msg,
      };

    case EventsActionTypes.DELETE_EVENT_SUCCESS:
      const deletedEvent = action.payload.event;
      return {
        ...state,
        isLoading: false,
        events: [
          ...state.events.filter((evt: IEvent) => evt._id === deletedEvent._id),
        ],
      };

    case EventsActionTypes.DELETE_EVENT_ERROR:
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

export const getEvents = (state: RootState) => state.events.events;
export const getLoadingEvents = (state: RootState) => state.events.isLoading;
export const getErrorEvents = (state: RootState) => state.events.error;
export const getMessageEvents = (state: RootState) => state.events.msg;
export default reducer;
