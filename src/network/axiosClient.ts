import axios from 'axios';

export const baseServerUrl = `http://localhost:5022`;

export const axiosClient = axios.create({
    baseURL: baseServerUrl,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
