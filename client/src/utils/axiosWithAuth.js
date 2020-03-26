import axios from 'axios';

export const axiosWithAuth = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));

  return axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: token
    }
  });
};