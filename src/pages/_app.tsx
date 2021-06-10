import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';

import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
			setTheme('dark');
		} else {
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
			setTheme('light');
		}
	}, []);

	return (
		<div className='bg-lightGray dark:bg-darkGray min-h-screen'>
			<Header theme={theme} />
			<Component {...pageProps} />
			<NextNprogress
				color='#00a2ff'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			<Footer />
		</div>
	);
}
export default MyApp;
