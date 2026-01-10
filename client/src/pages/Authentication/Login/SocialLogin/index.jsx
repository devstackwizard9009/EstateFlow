import React from 'react';
import useAuth from '@/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '@/hooks/useAxios';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

function SocialLogin() {
	const { signInWithGoogle } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from || '/';
	const axiosInstance = useAxios();

	const handleGoogleSignIn = () => {
		toast.info('Google sign-in is not available. Please use email/password.');
		// TODO: Implement Google OAuth if needed
	};

	return (
		<div className='w-full text-center'>
			<Button
				variant='outline'
				className='w-full flex items-center justify-center gap-2 bg-background border-border py-6 rounded-md'
				onClick={handleGoogleSignIn}
			>
				<svg
					aria-label='Google logo'
					width='18'
					height='18'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 512 512'
				>
					<path fill='#fff' d='M0 0h512v512H0z' />
					<path
						fill='#34a853'
						d='M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341'
					/>
					<path
						fill='#4285f4'
						d='M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57'
					/>
					<path
						fill='#fbbc02'
						d='M90 341a208 200 0 010-171l63 49q-12 37 0 73'
					/>
					<path
						fill='#ea4335'
						d='M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55'
					/>
				</svg>
				Login with Google
			</Button>
		</div>
	);
}

export default SocialLogin;
