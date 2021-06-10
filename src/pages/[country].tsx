import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Country } from '../models/country';
import api from '../services/api';
import { BsArrowLeft } from 'react-icons/bs';

interface CountryProps {
	country: Country;
}

export default function CountryPage({ country }: CountryProps) {
	const handleLanguages = () => {
		const languages = [] as string[];
		country.languages.forEach((item) => languages.push(item.name));

		return languages.join(', ');
	};

	return (
		<div className='pt-16 w-10/12 m-auto dark:text-white'>
			<Link href='/'>
				<a className='hover:opacity-80 transition-all duration-75 flex items-center gap-2 w-36 shadow-md py-2 px-10 dark:bg-darkBlue'>
					<BsArrowLeft />
					Back
				</a>
			</Link>
			<div className='pt-16 flex flex-col md:flex-row gap-10 justify-between md:items-center'>
				<img
					className='w-full md:h-96 md:w-7/12 md:max-w-3xl object-cover'
					src={country?.flag}
					alt={country?.name}
				/>

				<div>
					<h1 className='font-bold text-3xl mb-5'>{country?.name}</h1>
					<div className='flex flex-col md:flex-row justify-between md:gap-28'>
						<div>
							<p className='mb-2'>
								<b className='font-medium'>Native name:</b> {country.nativeName}
							</p>
							<p className='mb-2'>
								<b className='font-medium'>Population:</b>{' '}
								{new Intl.NumberFormat('pt-BR').format(country.population)}
							</p>
							<p className='mb-2'>
								<b className='font-medium'>Region:</b> {country.region}
							</p>
							<p className='mb-2'>
								<b className='font-medium'>Sub Region:</b> {country.subregion}
							</p>
							<p className='mb-2'>
								<b className='font-medium'>Capital:</b> {country.capital}
							</p>
						</div>
						<div className='mt-10 md:m-0'>
							<p className='mb-2'>
								<b className='font-medium'>Top Level Domain:</b>{' '}
								{country.topLevelDomain}
							</p>
							<p className='mb-2'>
								<b className='font-medium'>Currencies:</b>{' '}
								{country.currencies[0].name}
							</p>
							<p className='mb-2'>
								<b className='font-medium'>Language name:</b>{' '}
								{handleLanguages()}
							</p>
						</div>
					</div>
					{country.borders.length ? (
						<div className='mt-10 mb-10'>
							<div className='md:flex items-center'>
								<b className='font-medium block mb-4 md:mb-0 mr-2'>
									Border Countries:
								</b>
								<div className='flex flex-wrap gap-2'>
									{country.borders.map((border) => (
										<Link key={border} href={border}>
											<a className='mr-2 py-1 px-5 font-normal rounded shadow-lg dark:bg-darkBlue hover:opacity-80'>
												{border}
											</a>
										</Link>
									))}
								</div>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const response = await api.get(`/alpha/${params?.country}`);

	return {
		props: {
			country: response.data,
		},
	};
};
