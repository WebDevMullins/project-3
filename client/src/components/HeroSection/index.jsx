import { Button, Link } from '@nextui-org/react'

const HeroSection = () => {
	return (
		<section className='h-screen flex flex-col justify-center'>
				<div className='grid gap-8 max-w-screen-xl px-4 py-8 mx-auto xl:gap-0 lg:py-16 lg:grid-cols-12'>
					<div className='lg:mt-0 lg:col-span-5 lg:flex'>
						<img
							src='./images/Hero.png'
							alt='AiImage'
						/>
					</div>
					<div className='ml-auto flex flex-col items-center text-center place-self-center lg:col-span-7'>
						<h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
							Welcome to <span className='text-primary'>AI</span>conic
						</h1>
						<p className='max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl'>
							Streamline the process of creating icons for your business
							website, applications, or brand by utilizing our AI-powered
							digital icon generator.
						</p>
						<Button
							href='/generate'
							as={Link}
							color='primary'
							className='hover:cursor-pointer'>
							Get started
							<svg
								className='w-5 h-5 ml-2 -mr-1'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
									clipRule='evenodd'></path>
							</svg>
						</Button>
					</div>
				</div>
			</section>
	)
}

export default HeroSection
