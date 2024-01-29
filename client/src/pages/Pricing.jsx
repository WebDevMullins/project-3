import { useMutation } from '@apollo/client'
import { Button } from '@nextui-org/react'

import { tiers } from '@utils/data'
import { CREATE_CHECKOUT_SESSION } from '@utils/mutations'

function Pricing() {
	const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION)

	const handleCheckout = async (priceId) => {
		console.log('Price ID:', priceId)
		const token = localStorage.getItem('id_token')
		console.log('Retrieved token:', token)
		if (!token) {
			console.error('No token found in local storage.')
			return
		}
		try {
			// Pass the token as a variable to the mutation
			const { data } = await createCheckoutSession({
				variables: { token, priceId }
			})
			const sessionId = data.createCheckoutSession.sessionId

			// Redirect to Stripe Checkout
			const stripe = window.Stripe(
				'pk_test_51Oa8aqAA6kLI3uZegyJ0iH1yrozTq8i14LKdKXby2sP1yj2Mycpk1pKVmOq5hpAGlgId8Xlb2zGMQZVwBLlIz8Ul00oB4IdgoE'
			)
			await stripe.redirectToCheckout({ sessionId })
		} catch (error) {
			console.error('Error creating checkout session:', error)
		}
	}

	return (
		<section className='flex flex-row justify-center w-full mx-auto my-16 bg-neutral-700/25 rounded'>
			<div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
				<div className='mx-auto max-w-screen-md text-center mb-8 lg:mb-12'>
					<h2 className='mb-4 text-4xl tracking-tight font-extrabold text-white'>
						Worry about your app, not your bill
					</h2>
					<p className='mb-5 font-light text-gray-400 sm:text-xl'>
						We wanted pricing to be as simple as possible. No calculator needed.
					</p>
				</div>
				<div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
					{/* <!-- Left Pricing Card --> */}
					<div className='flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-neutral backdrop-blur-sm rounded-3xl border border-gray-500 shadow xl:p-8'>
						<h3 className='mb-4 text-2xl text-white font-semibold'>Starter</h3>
						<p className='font-light text-gray-400 sm:text-lg'>
							Perfect for beginners exploring the world of AI-generated icons.
						</p>
						<div className='flex justify-center items-baseline my-8'>
							<span className='mr-2 text-5xl font-extrabold'>$5</span>
						</div>
						<Button
							disabled
							color='primary'
							variant='bordered'
							className='mb-8'>
							Coming Soon!
						</Button>
						{/* <!-- List --> */}
						<ul
							role='list'
							className='mb-8 space-y-4 text-left'>
							{tiers.starter.map((item) => (
								<li
									key={item}
									className='flex items-center space-x-3'>
									<svg
										className='flex-shrink-0 w-5 h-5 text-primary'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'></path>
									</svg>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
					{/* <!-- Center Pricing Card --> */}
					<div className='flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-neutral backdrop-blur-sm rounded-3xl border-medium border-primary shadow xl:p-8'>
						<h3 className='mb-4 text-2xl text-primary font-semibold'>Plus</h3>
						<p className='font-light text-gray-400 sm:text-lg'>
							Ideal for individuals or small teams starting to explore icon
							generation.
						</p>
						<div className='flex justify-center items-baseline my-8'>
							<span className='mr-2 text-5xl font-extrabold'>$10</span>
						</div>
						<Button
							color='primary'
							className='mb-8'
							onClick={() => handleCheckout('price_1ObEEvAA6kLI3uZeIaRFMTBQ')}>
							Purchase Credits
						</Button>
						{/* <!-- List --> */}
						<ul
							role='list'
							className='mb-8 space-y-4 text-left'>
							{tiers.plus.map((item) => (
								<li
									key={item}
									className='flex items-center space-x-3'>
									<svg
										className='flex-shrink-0 w-5 h-5 text-primary'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'></path>
									</svg>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
					{/* <!-- Right Pricing Card --> */}
					<div className='flex flex-col p-6 mx-auto max-w-lg text-center text-white bg-neutral backdrop-blur-sm rounded-3xl border border-gray-500 shadow xl:p-8'>
						<h3 className='mb-4 text-2xl text-white font-semibold'>Premium</h3>
						<p className='font-light text-gray-400 sm:text-lg'>
							Optimal for those seeking low price/icon generation.
						</p>
						<div className='flex justify-center items-baseline my-8'>
							<span className='mr-2 text-5xl font-extrabold'>$15</span>
						</div>
						<Button
							disabled
							color='primary'
							variant='bordered'
							className='mb-8'>
							Coming Soon!
						</Button>
						{/* <!-- List --> */}
						<ul
							role='list'
							className='mb-8 space-y-4 text-left'>
							{tiers.premium.map((item) => (
								<li
									key={item}
									className='flex items-center space-x-3'>
									<svg
										className='flex-shrink-0 w-5 h-5 text-primary'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'></path>
									</svg>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Pricing
