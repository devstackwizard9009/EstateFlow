import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function Banner() {
	return (
		<section
			className='w-full h-[32rem] bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative'
			style={{
				backgroundImage: 'linear-gradient(135deg, hsl(200, 85%, 55%) 0%, hsl(210, 80%, 50%) 50%, hsl(220, 75%, 45%) 100%)',
			}}
		>
			{/* Overlay */}
			<div className='absolute inset-0 bg-black/20' />

			{/* Content */}
			<div className='relative z-10 h-full flex flex-col  justify-center  text-white px-4 section'>
				<h1 className='text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md '>
					Find the right home
					<span className='block'>at the right price</span>
				</h1>

				<div className='mt-8 w-full max-w-xl'>
					<div className='flex rounded-xl overflow-hidden shadow-xl bg-white text-black border-2 border-white/20 backdrop-blur-sm'>
						<input
							type='text'
							placeholder='Enter an address, neighborhood, city, or ZIP code'
							className='w-full px-4 py-5 outline-none text-sm focus:ring-2 focus:ring-primary/20'
						/>
						<button className='px-6 hover:bg-primary hover:text-white text-primary text-base font-semibold transition-all duration-200 cursor-pointer'>
							<FaMagnifyingGlass />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
