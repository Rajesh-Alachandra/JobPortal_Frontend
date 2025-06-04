// axiosInstance.js
import axios from 'axios';

// Base URL of your backend API
const BASE_URL = 'http://localhost:4000/api/';

// ❌ Axios instance WITHOUT auth (for login, register, public routes)
export const noAuthAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ✅ Axios instance WITH auth (token will be attached automatically)
export const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically attach token to every request using interceptor
authAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
