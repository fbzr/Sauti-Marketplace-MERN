import axios from 'axios';

export default (token, userId) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('id', userId);
    } else {
        delete axios.defaults.headers.common['Authorization'];
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
    }
};