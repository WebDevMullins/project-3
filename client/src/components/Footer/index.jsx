import { Link } from '@nextui-org/react'

function Footer() {
	return (
		<footer className='flex rounded-lg shadow'>
			<div className='w-full flex items-center justify-center gap-2 mx-auto m-4 max-w-screen-xl text-center'>
				<p className='text-sm text-gray-400 sm:text-center'>©2024</p>
				<Link
					href='/ourteam'
					className='hover:underline'>
					AIconic ™
				</Link>
				<p className='text-sm text-gray-400 sm:text-center'>
					All Rights Reserved.
				</p>
			</div>
		</footer>
	)
}

export default Footer
