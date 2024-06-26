import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ebook-backend-3czm.onrender.com/api', // Update with your server URL  https://ebook-backend-3czm.onrender.com/api
});

const authToken = sessionStorage.getItem('authToken');
if (authToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  api.defaults.headers.common['Content-Type'] = 'application/json';
}

export default api;




