import axios from 'axios';
import { getAccessToken, refreshAccessToken, removeTokens } from './auth';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

instance.interceptors.request.use(
    (config) => {
        console.log('Request Config:', config);
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('Error Response:', error.response);
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            console.log('401 Unauthorized - attempting to refresh token');
            originalRequest._retry = true;
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                console.log('Token refreshed successfully');
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            } else {
                console.log('Failed to refresh token, removing tokens and redirecting');
                removeTokens();

                // Optional: Log the current pathname for debugging
                const pathname = window.location.pathname;
                console.log('Current pathname:', pathname);

                if (pathname.startsWith('/manager')) {
                    window.location.href = '/manager';
                } else if (pathname.startsWith('/admin')) {
                    window.location.href = '/admin/login';
                } else {
                    window.location.href = '/login';
                }
            }
        } else {
            console.log('Other error occurred:', error);
        }

        return Promise.reject(error);
    }
);

export default instance;
