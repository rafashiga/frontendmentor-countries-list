import Link from 'next/link';
import { useState } from 'react';
import { IoMoonOutline, IoMoonSharp } from 'react-icons/io5';

interface HeaderProps {
	theme: string;
}

function Header({ theme: nextTheme }: HeaderProps) {
	const [theme, setTheme] = useState(nextTheme);

	const toggleTheme = () => {
		if (
			localStorage.theme !== 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
			setTheme('light');
		} else {
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
			setTheme('dark');
		}
	};

	return (
		<header className='w-full pt-4 pb-4 shadow-md z-10 dark:bg-darkBlue dark:text-white'>
			<div className='w-10/12 m-auto flex justify-between'>
				<Link href='/'>
					<a className='font-bold text-2xl'>Where in the world?</a>
				</Link>
				<button
					aria-label={`change theme to ${theme}`}
					type='button'
					onClick={() => toggleTheme()}
					className='flex items-center gap-2 font-medium hover:opacity-80 transition-all duration-500'
				>
					<IoMoonOutline />
					Dark Mode
				</button>
			</div>
		</header>
	);
}

export default Header;
