import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const api = {
    Blog: axios.create({
        baseURL: `${baseURL}/Blog`,
    }),
    Post: axios.create({
        baseURL: `${baseURL}/Post`,
    }),
    User: axios.create({
        baseURL: `${baseURL}/User`,
    })
  };

export default api;