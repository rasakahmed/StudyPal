import api from './api';

export const tasksService = {
  list: (params) => api.get('/tasks', { params }).then((res) => res.data.tasks),
  create: (payload) => api.post('/tasks', payload).then((res) => res.data.task),
  update: (id, payload) => api.put(`/tasks/${id}`, payload).then((res) => res.data.task),
  remove: (id) => api.delete(`/tasks/${id}`)
};
