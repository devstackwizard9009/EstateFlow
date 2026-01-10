import { Link, NavLink } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
	const contactUs = [
		{
			name: 'estateflow.support@gmail.com',
			to: 'mailto:estateflow.support@gmail.com',
		},
	];

	const terms = ['Terms of Service', 'Privacy Policy', 'Disclaimer'];

	return (
		<footer className='bg-background text-foreground py-12 border-t border-muted'>
			<div className='section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
				<Card className='shadow-none bg-transparent border-none p-0'>
					<CardContent className='p-0'>
						<Link to='/' className='inline-flex items-center gap-2'>
							<span className='text-2xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent'>
								EstateFlow
							</span>
						</Link>
						<p className='mt-4 text-muted-foreground'>
							Discover your next home with confidence. Verified listings,
							interactive maps, secure transactions, and user-driven reviews —
							all in one place.
						</p>
					</CardContent>
				</Card>

				<Card className='shadow-none bg-transparent border-none p-0'>
					<CardContent className='p-0'>
						<h4 className='font-semibold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2'>
							Quick Links
						</h4>
						<ul className='space-y-1'>
							{['Home', 'Properties', 'About Us', 'Contact'].map((page) => (
								<li key={page}>
									<NavLink
										to={
											page === 'Home'
												? '/'
												: `/${page.toLowerCase().replace(/\s/g, '-')}`
										}
										className='block text-sm transition-transform hover:scale-105 hover:text-primary'
									>
										{page}
									</NavLink>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>

				<Card className='shadow-none bg-transparent border-none p-0'>
					<CardContent className='p-0'>
						<h4 className='font-semibold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2'>
							Contact Us
						</h4>
						<ul className='space-y-1'>
							{contactUs.map((info, index) => (
								<li key={index}>
									<Link
										to={info.to}
										target='_blank'
										className='block text-sm transition-transform hover:scale-105 hover:text-primary'
									>
										{info.name}
									</Link>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>

				<Card className='shadow-none bg-transparent border-none p-0'>
					<CardContent className='p-0'>
						<h4 className='font-semibold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2'>Legal</h4>
						<ul className='space-y-1'>
							{terms.map((topic, index) => (
								<li key={index}>
									<Link
										to={`/legal/${topic.toLowerCase().replace(/\s/g, '-')}`}
										className='block text-sm transition-transform hover:scale-105 hover:text-primary'
									>
										{topic}
									</Link>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</div>

			<Separator className='my-8' />

			<div className='flex flex-col items-center gap-4'>
				<div className='text-sm font-semibold bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent text-center'>
					EstateFlow
				</div>
			</div>
		</footer>
	);
};

export default Footer;
