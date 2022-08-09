import axios from '@utils/api/axios';

const fetchEvents = async (params: any) => {
  return await axios.get('/events', {params: params});
};

const sendEvent = async (event: any) => {
  return await axios.post('/events', {event: event});
};

const updateEvent = async (eventId: string, event: any) => {
  return await axios.patch(`/events/${eventId}`, {event: event});
};

const deleteEvent = async (eventId: string, reason: string) => {
  return await axios.put(`/events/delete/${eventId}`, {reason});
};

export default {
  fetchEvents,
  sendEvent,
  updateEvent,
  deleteEvent,
};
