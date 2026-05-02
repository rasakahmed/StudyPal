import api from './api';

export const authService = {
  login: (payload) => api.post('/auth/login', payload).then((res) => res.data),
  register: (payload) => api.post('/auth/register', payload).then((res) => res.data),
  profile: () => api.get('/auth/profile').then((res) => res.data)
};
