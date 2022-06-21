import axios from 'axios';

const apiGoogle = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.ACCESS_KEY,
  },
});

export { apiGoogle };
