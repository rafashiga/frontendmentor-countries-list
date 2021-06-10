import Link from 'next/link';

function Footer() {
	return (
		<div className='dark:text-gray text-center p-5'>
			Challenge by{' '}
			<Link href='https://www.frontendmentor.io/challenges'>
				<a target='_blank' className='text-blue hover:opacity-80'>
					Frontend Mentor{' '}
				</a>
			</Link>
			. Coded by{' '}
			<Link href='https://github.com/rafashiga/frontendmentor-countries-list'>
				<a target='_blank' className='text-blue hover:opacity-80'>
					Rafael Shiga
				</a>
			</Link>
			.
		</div>
	);
}

export default Footer;
