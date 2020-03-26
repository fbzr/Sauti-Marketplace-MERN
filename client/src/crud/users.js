import { axiosWithAuth } from '../utils/axiosWithAuth';

export const getAllUsers = async () => {
    try {
        return await axiosWithAuth().get('/api/users/');
    } catch(err) {
        return err;
    }
}