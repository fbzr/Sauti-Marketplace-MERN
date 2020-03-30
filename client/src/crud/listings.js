import { axiosWithAuth } from '../utils/axiosWithAuth';

export const getAllListings = async () => {
    try {
        return await axiosWithAuth().get('/api/listings/');
    } catch(err) {
        return err;
    }
}

export const addListing = async listing => {
    try {
        return axiosWithAuth().post('/api/listings/', listing);
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

export const editListing = async listing => {
    try {
        return await axiosWithAuth().put(`/api/listings/${listing._id}`, listing);
    } catch(err) {
        return err;
    }
}

export default {
    getAllListings,
    addListing,
    removeListing,
    editListing
}