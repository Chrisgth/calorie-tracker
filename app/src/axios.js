import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API_URL}`,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');

      window.location.href = '/login'; // Replace with your login page path
    }
    return Promise.reject(error);
  },
);

export default instance;
