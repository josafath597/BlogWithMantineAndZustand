import axios from 'axios';

const entriesApi = axios.create({
  baseURL: 'http://localhost:7835',
});

export default entriesApi;
