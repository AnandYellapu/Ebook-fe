import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ebook-zopw.onrender.com/api', // Update with your server URL  http://localhost:1113/api
});

const authToken = sessionStorage.getItem('authToken');
if (authToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  api.defaults.headers.common['Content-Type'] = 'application/json'; // Set Content-Type to 'application/json'
}

export default api;




