import axios from 'axios';

const api = axios.create({
  baseURL: 'http://desafioonline.webmotors.com.br/',
});

export default api;