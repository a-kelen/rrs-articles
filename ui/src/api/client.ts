import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

export const setAuthToken = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  client.defaults.headers.common.Authorization = '';
};

const storageToken = localStorage.getItem('token');
if (storageToken) {
  setAuthToken(storageToken);
}

export default client;
