import api from './api';

export const financeService = {
  list: () => api.get('/finance').then((res) => res.data.expenses),
  create: (payload) => api.post('/finance', payload).then((res) => res.data.expense),
  update: (id, payload) => api.put(`/finance/${id}`, payload).then((res) => res.data.expense),
  remove: (id) => api.delete(`/finance/${id}`),
  analytics: (params) => api.get('/finance/analytics', { params }).then((res) => res.data)
};
