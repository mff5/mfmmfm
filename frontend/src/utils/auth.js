import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const setTokens = (accessToken, refreshToken) => {
    console.log('Setting Tokens:', { accessToken, refreshToken });
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const removeTokens = () => {
    console.log('Removing Tokens');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export const isAuthenticated = async () => {
    let accessToken = getAccessToken();
    if (!accessToken) {
        console.log('No access token found');
        return false;
    }

    let decodedToken;
    try {
        decodedToken = jwtDecode(accessToken);
        console.log('Decoded Token:', decodedToken);
    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp <= currentTime) {
        console.log('Access token expired, attempting to refresh');
        accessToken = await refreshAccessToken();
        if (!accessToken) {
            console.log('Failed to refresh access token');
            return false;
        }
        decodedToken = jwtDecode(accessToken);
    }
    console.log('Access token is valid:', decodedToken.exp > currentTime);
    return decodedToken.exp > currentTime;
};

export const refreshAccessToken = async () => {
    try {
        const response = await axios.post('http://localhost:8080/auth/refresh', {
            refreshToken: getRefreshToken(),
        });
        const { accessToken, refreshToken } = response.data;
        setTokens(accessToken, refreshToken);
        return accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        removeTokens();
        return null;
    }
};

// Logging the token expiry for debugging purposes
export const logTokenExpiry = () => {
    const accessToken = getAccessToken();
    if (accessToken) {
        const decoded = jwtDecode(accessToken);
        console.log('Access Token Expiry:', new Date(decoded.exp * 1000));
    }
};
