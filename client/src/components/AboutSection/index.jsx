import React from "react"

const AboutSection = () => {
	return (
		<div className='flex flex-col justify-center w-full mx-auto my-16 '>
			<h1 className='mt-8 text-4xl tracking-tight font-extrabold text-white text-center'>
				About A.I.conic
			</h1>
			<section className=' '>
				<div className='mx-auto max-w-screen-xl py-8 px-6'>
					<div className=' mb-8 lg:mb-16 text-center'>
						<h2 className='mb-4 text-2xl tracking-tight font-extrabold text-white '>
							Quick. Simple. Easy.
						</h2>
						<p className='text-gray-500 sm:text-xl justify-self-center md:px-16'>
							[enter sales pitch here] Lorem ipsum dolor sit amet consectetur,
							adipisicing elit. Adipisci ipsum unde modi earum quibusdam aliquid
							blanditiis laborum nobis eius repellat et placeat consequuntur,
							possimus pariatur exercitationem distinctio praesentium minima
							sed.
						</p>
					</div>
					<div className='space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 justify-center text-center'>
						<div className='flex flex-col px-16'>
							<div className='flex justify-center'>
								<div className='flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12'>
									<svg
										class='w-6 h-6 text-gray-800'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'>
										<path
											stroke='white'
											stroke-linecap='round'
											stroke-width='2'
											d='M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4'
										/>
									</svg>
								</div>
							</div>

							<h3 className='mb-2 text-xl font-bold '>Custom</h3>
							<p className='text-gray-500 '>
								Generated Icons are completely unique and created specifically
								for you!
							</p>
						</div>
						<div>
							<div className='flex justify-center'>
								<div className='flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 '>
									<svg
										class='w-6 h-6 text-gray-800 '
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'>
										<path
											stroke='white'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M18.5 12A2.5 2.5 0 0 1 21 9.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 1 0 5V17a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2.5a2.5 2.5 0 0 1-2.5-2.5Z'
										/>
									</svg>
								</div>
							</div>
							<h3 className='mb-2 text-xl font-bold '>Credit System</h3>
							<p className='text-gray-500 '>
								Users are able to purchse credits to generate icons.
							</p>
						</div>
						<div>
							<div className='flex justify-center'>
								<div className='flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900'>
									<svg
										class='w-6 h-6 text-gray-800 '
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'>
										<path
											stroke='white'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M9.1 4H5c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V9c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9V5c0-.5-.4-.9-.9-.9Zm-10 10H5c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Zm10 0H15c-.5 0-.9.4-.9.9V19c0 .5.4.9.9.9h4c.5 0 .9-.4.9-.9v-4c0-.5-.4-.9-.9-.9Z'
										/>
									</svg>
								</div>
							</div>
							<h3 className='mb-2 text-xl font-bold '>User Gallery</h3>
							<p className='text-gray-500 '>
								Users are able to view their collection of icons, by visiting
								their gallery.
							</p>
						</div>
						<div>
							<div className='flex justify-center'>
								<div className='flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900'>
									<svg
										class='w-6 h-6 text-gray-800 '
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'>
										<path
											stroke='white'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M3 10h18M6 14h2m3 0h5M3 7v10c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1Z'
										/>
									</svg>
								</div>
							</div>
							<h3 className='mb-2 text-xl font-bold '>Stripe</h3>
							<p className='text-gray-500 '>
								A.I.conic utilizes Stripe to ensure security to users.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
export default AboutSection
