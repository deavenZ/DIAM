import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Serviços de Posts
export const postService = {
  getAll: () => api.get('/posts/'),
  getById: (id) => api.get(`/posts/${id}/`),
  create: (data) => api.post('/posts/', data),
  update: (id, data) => api.put(`/posts/${id}/`, data),
  delete: (id) => api.delete(`/posts/${id}/`),
};

// Serviços de Votações
export const voteService = {
  getAll: () => api.get('/votes/'),
  getById: (id) => api.get(`/votes/${id}/`),
  create: (data) => api.post('/votes/', data),
  update: (id, data) => api.put(`/votes/${id}/`, data),
  delete: (id) => api.delete(`/votes/${id}/`),
  submitVote: (id, optionId) => api.post(`/votes/${id}/submit/`, { optionId }),
};

// Serviços de Usuário
export const userService = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.put('/auth/profile/', data),
  changePassword: (data) => api.post('/auth/change-password/', data),
};

export default api; 