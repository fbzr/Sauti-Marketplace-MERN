import { axiosWithAuth } from '../utils/axiosWithAuth';

export const getAllListings = async () => {
    try {
        return await axiosWithAuth().get('/api/listings/');
    } catch(err) {
        return err;
    }
}