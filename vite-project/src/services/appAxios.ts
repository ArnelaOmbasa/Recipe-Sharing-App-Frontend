import axios from 'axios';
import { BASE_URL } from '../constants';


const appAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// This is an interceptor that adds the auth token to every request
appAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default appAxios;
