import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';

import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
		} else {
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
		}
	}, []);

	return (
		<div className='bg-lightGray dark:bg-darkGray'>
			<Header />
			<Component {...pageProps} />
			<NextNprogress
				color='#00a2ff'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
		</div>
	);
}
export default MyApp;
