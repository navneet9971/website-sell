import axios from "axios";
import Cookies from "js-cookie";

const baseURL = 'http://localhost:4000/'

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  }
});


// Add an interceptor for setting the Authorization header with the access token
axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("access");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
)


export default axiosInstance;