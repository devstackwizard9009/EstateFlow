export default function PropertyCard({ property, children }) {
	return (
		<div className='bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl p-5 space-y-2 transition-all duration-300 hover:scale-[1.02] border border-border/50'>
			<img
				src={property.images?.[0]?.url}
				alt={property.title}
				className='rounded-lg h-40 w-full object-cover transition-transform duration-300 hover:scale-105'
			/>

			<h2 className='text-lg font-semibold'>{property.title}</h2>
			<p className='text-sm text-muted-foreground'>{property.location}</p>

			<div className='flex items-center gap-2 mt-1'>
				<img
					src={property.agentImage}
					alt={property.agentName}
					className='h-8 w-8 rounded-full'
				/>
				<span className='text-sm'>{property.agentName}</span>
			</div>

			<p className='text-sm'>
				<span className='font-medium'>Price:</span> {property.minPrice} -{' '}
				{property.maxPrice} BDT
			</p>

			<p className='text-sm'>
				<span className='font-medium'>Status:</span>{' '}
				<span
					className={
						property.verificationStatus === 'verified'
							? 'text-green-500'
							: 'text-yellow-500'
					}
				>
					{property.verificationStatus}
				</span>
			</p>

			<div>{children}</div>
		</div>
	);
}
