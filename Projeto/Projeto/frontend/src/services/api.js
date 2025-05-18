import axios from 'axios';

const API_URL = 'http://localhost:8000/bd/api';

const api = axios.create({
  baseURL: API_URL,
});


// Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Token enviado no header:', token);
  if (token &&
    !config.url.endsWith('/auth/login/') &&
    !config.url.endsWith('/auth/register/')) {
    config.headers.Authorization = `Token ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
}
);

// Serviços de Posts
export const postService = {
  getAll: () => api.get('/posts/'),
  getById: (id) => api.get(`/posts/${id}/`),
  create: (data) => api.post('/posts/new/', data),
  update: (id, data) => api.put(`/posts/${id}/`, data),
  upvote: (id) => api.post(`/posts/${id}/upvote/`),
  delete: (id) => api.delete(`/posts/${id}/`),
  getComentarios: (postId) => api.get(`/posts/${postId}/comentarios/`),
  addComentario: (postId, data) => api.post(`/posts/${postId}/comentarios/`, data),
  deleteComentario: (postId, comentarioId) => api.delete(`/posts/${postId}/comentarios/`, { data: { comentario_id: comentarioId } }),
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
  login: (credentials) => api.post('/auth/login/', credentials, {
    headers: { 'Content-Type': 'application/json' }
  }),
  register: (userData) => api.post('/auth/register/', userData, {
    headers: { 'Content-Type': 'application/json' }
  }),
  getUser: () => api.get('/auth/user/'),
  getProfile: () => api.get('/profile/'),
  getProfileByUsername: (username) => api.get(`/profile/${username}/`),
  updateProfileByUsername: (username, data) => api.put(`/profile/${username}/`, data),
  updateProfile: (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }
    return api.put('/profile/', formData, {
      withCredentials: true
    });
  },
  changePassword: (data) => api.post('/change-password/', data, {
    headers: { 'Content-Type': 'application/json' }
  }),
  getAllUsers: () => api.get('/users/'),
  getUserById: (username) => api.get(`/users/${username}/`),
  deleteUser: (username) => api.delete(`/users/${username}/`),
  updateUser: (username, data) => api.put(`/users/${username}/`, data),
};

// Serviços de Ligas e Clubes
export const leagueService = {
  getAll: () => api.get('/ligas/'),
};

export const clubService = {
  getAll: () => api.get('/clubes/'),
  getByLiga: (ligaId) => api.get(`/ligas/${ligaId}/clubes/`),
};

function getCSRFToken() {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
}

export default api; 