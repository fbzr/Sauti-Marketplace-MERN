import { axiosWithAuth } from '../utils/axiosWithAuth';

export const login = async user => {
    try {
        return axiosWithAuth().post('/api/auth/login', user);
    } catch(err) {
        throw err;
    }
}

export const register = async user => {
    try {
        return axiosWithAuth().post('/api/auth/register', user);
    } catch(err) {
        throw err;
    }
}