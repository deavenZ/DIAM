import axios from 'axios';

const API_URL = 'http://localhost:8000/bd/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Token enviado no header:', token);
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}
);

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
  getUser: () => api.get('/auth/user/'),
  getProfile: () => api.get('/profile/'),
  updateProfile: (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }
    return api.put('/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': getCSRFToken()
      },
      withCredentials: true
    });
  },
  changePassword: (data) => api.post('/auth/change-password/', data),
};

function getCSRFToken() {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
}

export default api; 