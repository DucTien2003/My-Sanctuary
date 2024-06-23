import axios from 'axios';

const axiosCustom = () => {
  return axios.create({
    baseURL: 'http://localhost:8081/api',
    timeout: 10000,
    headers: { token: localStorage.getItem('token') },
  });
};

export default axiosCustom;
