import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ebook-zopw.onrender.com/api', // Update with your server URL  https://ebook-zopw.onrender.com
});

// Attach the token to the headers for every request, if it exists
const authToken = sessionStorage.getItem('authToken');
// console.log('AuthToken:', authToken); // Log the token
if (authToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

export default api;