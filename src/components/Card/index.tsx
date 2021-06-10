import Link from 'next/link';
import { Country } from '../../models/country';

interface CardProps {
	country: Country;
}

function Card({ country }: CardProps) {
	return (
		<Link href={`/${country.alpha2Code}`}>
			<div className='cursor-pointer bg-white dark:bg-darkBlue rounded-md overflow-hidden shadow-md'>
				<img
					className='h-44 w-full object-cover'
					src={country.flag}
					alt={country.name}
				/>
				<div className='px-6 pt-6 pb-8 dark:text-white'>
					<h3 className='font-bold mb-3 text-xl'>{country.name}</h3>
					<p className='mb-1 text-sm'>
						<b className='font-semibold'>Population:</b>{' '}
						{new Intl.NumberFormat('pt-BR').format(country.population)}
					</p>
					<p className='mb-1 text-sm'>
						<b className='font-semibold'>Region:</b> {country.region}
					</p>
					<p className='mb-1 text-sm'>
						<b className='font-semibold'>Capital:</b> {country.capital}
					</p>
				</div>
			</div>
		</Link>
	);
}

export default Card;
