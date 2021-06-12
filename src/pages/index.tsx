import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';
import { BsSearch } from 'react-icons/bs';

import Card from '../components/Card';
import { Country } from '../models/country';
import api from '../services/api';

import styles from '../styles/Home.module.css';

interface HomeProps {
	countries: Country[];
}

export default function Home({ countries: Countries }: HomeProps) {
	const [countries, setCountries] = useState(Countries);
	const [region, setRegion] = useState('');
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSearch = async (event?: any) => {
		const inputValue = event?.target.value && search;
		setRegion('');
		if (search.length >= 2) {
			try {
				setLoading(true);
				const res = await api.get(`/name/${inputValue}`);
				setCountries(res.data);
				setLoading(false);
			} catch {
				setCountries([]);
				setLoading(false);
			}
		}
	};

	const toggleRegion = async (event: any) => {
		const selectValue = event.target.value;
		setRegion(selectValue);
		setSearch('');
		setLoading(true);
		try {
			let res;
			if (region) {
				res = await api.get(`/region/${selectValue}`);
			} else {
				res = await api.get(`/all`);
			}

			setCountries(res.data);

			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const resetList = (event: any) => {
		const value = event.target.value;

		if (value.length === 1) {
			setCountries(Countries);
		} else if (value.length > 2) {
			handleSearch();
		}
	};

	return (
		<>
			<NextSeo
				title='Countries List'
				description='Simple project to show a list of countries'
			/>
			<div className='min-h-screen z-0'>
				<div className='w-10/12 m-auto pt-10'>
					<div className='md:flex md:justify-between md:mb-10'>
						<div className='relative mb-10 md:mb-0'>
							<BsSearch className='absolute top-5 left-6 dark:text-white text-gray' />
							<input
								aria-label='search for a country'
								type='text'
								className='border-none rounded dark:text-white py-4 pl-16 w-full md:w-96 shadow dark:bg-darkBlue dark:placeholder-white'
								placeholder='Search for a country...'
								onKeyPress={handleSearch}
								onKeyDown={resetList}
								onChange={(event) => setSearch(event.target.value)}
								value={search}
							/>
						</div>
						<select
							aria-label='filter by region'
							onChange={toggleRegion}
							value={region}
							className='p-4 mb-5 md:mb-0 shadow rounded dark:bg-darkBlue dark:text-white'
						>
							<option value=''>Filter by Region</option>
							<option value='africa'>Africa</option>
							<option value='americas'>America</option>
							<option value='asia'>Asia</option>
							<option value='europe'>Europe</option>
							<option value='ocenia'>Ocenia</option>
						</select>
					</div>
					{loading && (
						<div className='flex justify-center'>
							<div className={styles.ldRing}>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					)}
					<div className='py-8 flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-10 md:gap-20'>
						{!loading &&
							countries.map((item, index: number) => (
								<Card country={item} key={`country-${index}`} />
							))}
					</div>

					{!countries.length && (
						<h3 className='dark:text-white text-4xl text-darkBlue font-bold text-center'>
							Not Found
						</h3>
					)}
				</div>
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const response = await api.get('/all');

	return {
		props: {
			countries: response.data,
		},
	};
};
