import { IoMoonOutline, IoMoonSharp } from 'react-icons/io5';

function Header() {
	const toggleTheme = () => {
		if (
			localStorage.theme !== 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
		} else {
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
		}
	};

	return (
		<header className='w-full pt-4 pb-4 shadow-md z-10 dark:bg-darkBlue dark:text-white'>
			<div className='w-10/12 m-auto flex justify-between'>
				<div className='font-bold text-2xl'>Where in the world?</div>
				<button
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
