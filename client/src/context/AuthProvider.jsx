import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import useAxios from '@/hooks/useAxios';

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const axiosInstance = useAxios();

	// Check for stored token and user on mount
	useEffect(() => {
		const token = localStorage.getItem('access-token');
		const storedUser = localStorage.getItem('user');

		if (token && storedUser) {
			try {
				const userData = JSON.parse(storedUser);
				setUser(userData);
				// Verify token is still valid by fetching current user
				fetchCurrentUser();
			} catch (err) {
				console.error('Error parsing stored user', err);
				localStorage.removeItem('access-token');
				localStorage.removeItem('user');
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	}, []);

	const fetchCurrentUser = async () => {
		try {
			const token = localStorage.getItem('access-token');
			if (!token) {
				setLoading(false);
				return;
			}

			const response = await axiosInstance.get('/auth/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setUser(response.data);
			localStorage.setItem('user', JSON.stringify(response.data));
		} catch (err) {
			console.error('Error fetching user', err);
			localStorage.removeItem('access-token');
			localStorage.removeItem('user');
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const createUser = async (email, password, name, profilePic) => {
		setLoading(true);
		try {
			const response = await axiosInstance.post('/auth/register', {
				email,
				password,
				name,
				profilePic,
			});

			const { token, user: userData } = response.data;
			localStorage.setItem('access-token', token);
			localStorage.setItem('user', JSON.stringify(userData));
			setUser(userData);
			return { user: userData };
		} catch (error) {
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const signIn = async (email, password) => {
		setLoading(true);
		try {
			const response = await axiosInstance.post('/auth/login', {
				email,
				password,
			});

			const { token, user: userData } = response.data;
			localStorage.setItem('access-token', token);
			localStorage.setItem('user', JSON.stringify(userData));
			setUser(userData);
			return { user: userData };
		} catch (error) {
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const logOut = () => {
		setLoading(true);
		localStorage.removeItem('access-token');
		localStorage.removeItem('user');
		setUser(null);
		setLoading(false);
		return Promise.resolve();
	};

	const updateUserProfile = async (updatedData) => {
		setLoading(true);
		try {
			// Update user in database
			const token = localStorage.getItem('access-token');
			await axiosInstance.put(`/users/${user._id}`, updatedData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Update local user state
			const updatedUser = { ...user, ...updatedData };
			setUser(updatedUser);
			localStorage.setItem('user', JSON.stringify(updatedUser));
		} catch (error) {
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const sendPasswordResetEmailHelper = async (email) => {
		// TODO: Implement password reset functionality
		throw new Error('Password reset not implemented yet');
	};

	const signInWithGoogle = () => {
		// TODO: Implement Google OAuth if needed
		throw new Error('Google sign-in not implemented yet');
	};

	const userInfo = {
		createUser,
		signIn,
		user,
		logOut,
		setUser,
		loading,
		setLoading,
		signInWithGoogle,
		updateUserProfile,
		sendPasswordResetEmailHelper,
	};

	return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
