// src/axiosInstance.js

import axios from "axios";
import { getToken } from "./services/apiService";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// Add a request interceptor to include the token in requests
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Basic ${import.meta.env.VITE_BASIC_TOKEN}`;
    //   config.headers["Content-Type"] = "*/*";
    //   config.headers["Accept"] = "*/*";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
