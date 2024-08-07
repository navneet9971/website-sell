import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const useAxiosInstance = () => {
  const { sessionId } = useAuth();
  console.log('Frontend Session ID:', sessionId);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (sessionId) {
        config.headers["Authorization"] = `Bearer ${sessionId}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;
