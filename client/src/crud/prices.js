import { axiosWithAuth } from '../utils/axiosWithAuth';

export const getAllPrices = async () => {
    try {
        return await axiosWithAuth().get('/api/prices');
    } catch(err) {
        return err;
    }
}

export const addPrice = async price => {
    try {
        return await axiosWithAuth().post('/api/prices', price);
    } catch(err) {
        return err;
    }
}

export const removePrice = async priceId => {
    try {
        return await axiosWithAuth().delete(`/api/prices/delete/${priceId}`);
    } catch(err) {
        return err;
    }
}

export const editPrice = async price => {
    try {
        return await axiosWithAuth().put(`/api/prices/${price._id}`, price);
    } catch(err) {
        return err;
    }
}