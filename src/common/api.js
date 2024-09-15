import axios from 'axios';

// Create an Axios instance with the base URL
const API = axios.create({
    baseURL: 'https://dev-project-ecommerce.upgrad.dev/api',
});

// Intercept the request to include the x-auth-token header if the token is present
API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers['x-auth-token'] = user.token; // Attach the token to the headers
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// API functions
export const login = (data) => API.post('/auth/login', data);
export const signup = (data) => API.post('/auth/signup', data);
export const getProducts = () => API.get('/products');
export const getProductDetails = (id) => API.get(`/products/${id}`);
export const addProduct = (data) => API.post('/products', data);
