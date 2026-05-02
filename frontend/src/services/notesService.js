import api from './api';

export const notesService = {
  list: (params) => api.get('/notes', { params }).then((res) => res.data.notes),
  create: (payload) => api.post('/notes', payload).then((res) => res.data.note),
  update: (id, payload) => api.put(`/notes/${id}`, payload).then((res) => res.data.note),
  remove: (id) => api.delete(`/notes/${id}`),
  summarize: (content) => api.post('/notes/ai/summary', { content }).then((res) => res.data),
  flashcards: (content) => api.post('/notes/ai/flashcards', { content }).then((res) => res.data)
};
