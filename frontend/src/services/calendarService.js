import api from './api';

export const calendarService = {
  list: () => api.get('/calendar').then((res) => res.data.events),
  create: (payload) => api.post('/calendar', payload).then((res) => res.data.event),
  update: (id, payload) => api.put(`/calendar/${id}`, payload).then((res) => res.data.event),
  remove: (id) => api.delete(`/calendar/${id}`)
};
