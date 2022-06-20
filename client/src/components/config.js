import axios from 'axios';

export const baseURL = 'http://localhost:5000/';
// export const baseURL = 'https://tofes-101.herokuapp.com/';

export const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.request.use(function (config) {
  console.log('Request Sent');
  const token = localStorage.getItem('mern_admin_dashboard');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
