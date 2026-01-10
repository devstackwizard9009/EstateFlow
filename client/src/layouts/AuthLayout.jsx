import { Outlet } from 'react-router';
import useDynamicTitle from '../hooks/useDynamicTitle';

function AuthLayout() {
	useDynamicTitle();
	return (
		<div className='bg-background  flex items-center justify-center'>
			<div className='grid grid-cols-1 md:grid-cols-[550px_1fr] w-full mx-auto h-screen'>
				{/* Outlet Section */}
				<div className='w-full  flex justify-center items-center px-4 sm:px-8 md:px-12 py-8'>
					<div className='w-full max-w-md'>
						<Outlet />
					</div>
				</div>

				{/* Image Section */}
				<div 
					className='hidden md:block h-full max-h-screen overflow-hidden bg-gradient-to-br from-primary/25 via-primary/15 to-background'
					style={{
						backgroundImage: 'linear-gradient(135deg, hsl(200, 85%, 55%, 0.15) 0%, hsl(210, 80%, 50%, 0.1) 50%, transparent 100%)',
					}}
				>
					<div className='w-full h-full flex items-center justify-center p-8'>
						<div className='text-center space-y-4'>
							<h2 className='text-3xl font-bold text-primary'>Welcome to EstateFlow</h2>
							<p className='text-muted-foreground'>Your trusted real estate platform</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthLayout;
