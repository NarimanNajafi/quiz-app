import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'https://opentdb.com' });

export default axiosInstance;
