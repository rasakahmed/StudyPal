import api from './api';

export const habitService = {
  list: () => api.get('/habits').then((res) => res.data.habits),
  upsert: (payload) => api.post('/habits', payload).then((res) => res.data.habit),
  remove: (id) => api.delete(`/habits/${id}`)
};
