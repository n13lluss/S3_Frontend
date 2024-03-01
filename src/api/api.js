import axios from 'axios';

const baseURL = 'https://localhost:7177/api';

const api = {
    Blog: axios.create({
        baseURL: `${baseURL}/Blog`,
    }),
    Post: axios.create({
        baseURL: `${baseURL}/Post`,
    })
  };

export default api;