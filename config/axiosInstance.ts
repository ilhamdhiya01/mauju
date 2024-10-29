/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const baseURL = process.env.URL_API_BE;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    if (response) {
      return response.data;
    }
    return response.data;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
