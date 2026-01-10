import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const axiosSecure = axios.create({
	baseURL: (import.meta.env.VITE_BASE_URL || 'http://localhost:5000') + '/api/v1',
});

function useAxiosSecure() {
	const { user, logOut } = useAuth();
	const navigate = useNavigate();

	axiosSecure.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem('access-token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	axiosSecure.interceptors.response.use(
		(res) => {
			return res;
		},
		(error) => {
			console.log('inside res interceptor', error);
			if (error.response) {
				const status = error.response.status;
				if (status === 403) {
					navigate('/forbidden');
				} else if (status === 401) {
					logOut()
						.then(() => {
							toast.error('Unauthorized access! Please login Again');
							navigate('/login');
						})
						.catch((err) => console.log(err));
				}
			}

			return Promise.reject(error);
		},
	);
	return axiosSecure;
}

export default useAxiosSecure;
