import axios from 'axios';

const baseURL = 'https://localhost:7177/api';
// const baseURL = 'https://i427798.luna.fhict.nl/api'

const api = {
    Blog: axios.create({
        baseURL: `${baseURL}/Blog`,
    }),
    Post: axios.create({
        baseURL: `${baseURL}/Post`,
    })
  };

export default api;