import axios from '@utils/api/axios';

const fetchEvents = async (params: any) => {
  return await axios.get('/events', {params});
};

const sendEvent = async (event: any) => {
  return await axios.post('/events', {event: event});
};

const updateEvent = async (eventId: string, event: any) => {
  return await axios.patch(`/events/${eventId}`, {event: event});
};

const deleteEvent = async (eventId: string) => {
  return await axios.delete(`/events/${eventId}`);
};

export default {
  fetchEvents,
  sendEvent,
  updateEvent,
  deleteEvent,
};
