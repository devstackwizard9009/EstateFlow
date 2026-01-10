import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
	baseURL: (import.meta.env.VITE_BASE_URL || 'http://localhost:5000') + '/api/v1',
});

function useAxios() {
	return axiosInstance;
}

export default useAxios;
