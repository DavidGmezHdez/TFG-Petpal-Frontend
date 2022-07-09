import {IEvent} from '@utils/Types';
import {Dispatch} from 'redux';
import EventsService from '@services/EventsService';
export enum EventsActionTypes {
  EVENTS_LOADING = 'eventsLoading',
  EVENTS_ERROR_FETCH = 'eventsErrorFetch',
  EVENTS_SUCCESS = 'eventsSuccess',
  SEND_EVENTS_SUCCESS = 'sendEventsSuccess',
  SEND_EVENTS_ERROR = 'sendEventsError',
  UPDATE_EVENT_SUCCESS = 'updateEventSuccess',
  UPDATE_EVENT_ERROR = 'updateEventError',
  DELETE_EVENT_SUCCESS = 'deleteEventSuccess',
  DELETE_EVENT_ERROR = 'deleteEventError',
  CLEAR_ERROR = 'clearError',
}

interface EventsLoadingAction {
  type: EventsActionTypes.EVENTS_LOADING;
}

interface EventsErrorAction {
  type: EventsActionTypes.EVENTS_ERROR_FETCH;
  payload: any;
}

interface EventsSuccessAction {
  type: EventsActionTypes.EVENTS_SUCCESS;
  payload: {events: IEvent[]};
}

interface SendEventsSuccessAction {
  type: EventsActionTypes.SEND_EVENTS_SUCCESS;
  payload: {event: IEvent};
}

interface SendEventsError {
  type: EventsActionTypes.SEND_EVENTS_ERROR;
  payload: any;
}

interface UpdateEventSuccessAction {
  type: EventsActionTypes.UPDATE_EVENT_SUCCESS;
  payload: {event: IEvent};
}
interface UpdateEventError {
  type: EventsActionTypes.UPDATE_EVENT_ERROR;
  payload: any;
}

interface DeleteEventSuccessAction {
  type: EventsActionTypes.DELETE_EVENT_SUCCESS;
  payload: {event: IEvent};
}
interface DeleteEventError {
  type: EventsActionTypes.DELETE_EVENT_ERROR;
  payload: any;
}

interface ClearErrorAction {
  type: EventsActionTypes.CLEAR_ERROR;
}

export type EventsActions =
  | EventsLoadingAction
  | EventsErrorAction
  | EventsSuccessAction
  | ClearErrorAction
  | SendEventsSuccessAction
  | SendEventsError
  | UpdateEventSuccessAction
  | UpdateEventError
  | DeleteEventSuccessAction
  | DeleteEventError;

export const fetchEvents = () => async (dispatch: Dispatch<EventsActions>) => {
  try {
    dispatch({
      type: EventsActionTypes.EVENTS_LOADING,
    });
    const res = await EventsService.fetchEvents();
    const events = res.data;
    dispatch({
      type: EventsActionTypes.EVENTS_SUCCESS,
      payload: {events},
    });
    return events;
  } catch (e) {
    console.log(e);
    dispatch({
      type: EventsActionTypes.EVENTS_ERROR_FETCH,
      payload: {msg: e.response.data.message},
    });
  }
};

export const sendEvent =
  (event: any) => async (dispatch: Dispatch<EventsActions>) => {
    try {
      dispatch({
        type: EventsActionTypes.EVENTS_LOADING,
      });
      const res = await EventsService.sendEvent(event);
      if (res.data) {
        const createdEvent = res.data;
        dispatch({
          type: EventsActionTypes.SEND_EVENTS_SUCCESS,
          payload: {event: createdEvent},
        });
        return createdEvent;
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: EventsActionTypes.SEND_EVENTS_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };

export const updateEvent =
  (eventId: string, event: any) =>
  async (dispatch: Dispatch<EventsActions>) => {
    try {
      dispatch({
        type: EventsActionTypes.EVENTS_LOADING,
      });
      const res = await EventsService.updateEvent(eventId, event);
      const updatedEvent = res.data;
      dispatch({
        type: EventsActionTypes.UPDATE_EVENT_SUCCESS,
        payload: {event: updatedEvent},
      });
      return updatedEvent;
    } catch (e) {
      console.log(e);
      dispatch({
        type: EventsActionTypes.UPDATE_EVENT_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };

export const deleteEvent =
  (eventId: string) => async (dispatch: Dispatch<EventsActions>) => {
    try {
      dispatch({
        type: EventsActionTypes.EVENTS_LOADING,
      });
      const res = await EventsService.deleteEvent(eventId);
      const deletedEvent = res.data;
      dispatch({
        type: EventsActionTypes.DELETE_EVENT_SUCCESS,
        payload: {event: deletedEvent},
      });
      return deletedEvent;
    } catch (e) {
      console.log(e);
      dispatch({
        type: EventsActionTypes.DELETE_EVENT_ERROR,
        payload: {msg: e.response.data.message},
      });
    }
  };

export const clearErrorEvent = () => (dispatch: Dispatch<EventsActions>) => {
  dispatch({
    type: EventsActionTypes.CLEAR_ERROR,
  });
};
