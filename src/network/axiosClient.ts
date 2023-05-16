import axios from 'axios';
import { session } from '../store';
import {get} from 'svelte/store'

export const baseServerUrl = `http://localhost:5022`;

export const axiosClient = axios.create({
	baseURL: baseServerUrl,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.request.use((config) => {
	config.headers.Authorization = get(session).key
	return config;
})
