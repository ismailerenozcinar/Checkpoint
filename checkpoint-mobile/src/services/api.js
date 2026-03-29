import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend API base URL
// Geliştirme sırasında localhost, production'da sunucu adresi kullanılacak
// ÖNEMLİ: Emulator/cihaz üzerinde çalıştırırken localhost yerine bilgisayarınızın local IP'sini girmelisiniz (örn: http://192.168.1.5:5000/api)
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Her istekte AsyncStorage'dan token'ı alıp Header'a ekler
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== AUTH ====================
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
};

// ==================== GAMES ====================
export const gameService = {
  getTrending: () => api.get('/games/trending'),
  getById: (id) => api.get(`/games/${id}`),
  search: (query, filters) => api.get('/games/search', { params: { query, ...filters } }),
  getSimilar: (id) => api.get(`/games/${id}/similar`),
};

// ==================== LIBRARY ====================
export const libraryService = {
  getMyLibrary: (status) => api.get('/library', { params: { status } }),
  addGame: (gameId, status) => api.post('/library', { gameId, status }),
  updateProgress: (libraryId, progress) => api.put(`/library/${libraryId}`, { progress }),
  removeGame: (libraryId) => api.delete(`/library/${libraryId}`),
};

// ==================== REVIEWS ====================
export const reviewService = {
  getByGame: (gameId) => api.get(`/reviews/game/${gameId}`),
  getByUser: (userId) => api.get(`/reviews/user/${userId}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// ==================== USERS ====================
export const userService = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/profile', data),
  getFollowers: (id) => api.get(`/users/${id}/followers`),
  getFollowing: (id) => api.get(`/users/${id}/following`),
  follow: (userId) => api.post(`/users/${userId}/follow`),
  unfollow: (userId) => api.delete(`/users/${userId}/follow`),
};

export default api;
