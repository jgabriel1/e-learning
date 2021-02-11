import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-elearning.herokuapp.com',
});

export default api;
