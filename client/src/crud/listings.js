import { axiosWithAuth } from '../utils/axiosWithAuth';

export const getAllListings = async () => {
    try {
        return await axiosWithAuth().get('/api/listings/');
    } catch(err) {
        return err;
    }
}

export const removeListing = async listingId => {
    try {
        return await axiosWithAuth().delete(`/api/listings/${listingId}`);
    } catch(err) {
        return err;
    }
}

export default {
    getAllListings,
    removeListing
}