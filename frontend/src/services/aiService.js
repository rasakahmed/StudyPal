import api from './api';

export const aiService = {
  chat: (messages) => api.post('/ai/chat', { messages }).then((res) => res.data),
  productivity: (context) => api.post('/ai/productivity', { context }).then((res) => res.data)
};
