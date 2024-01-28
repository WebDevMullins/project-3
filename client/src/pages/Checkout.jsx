import React from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_CHECKOUT_SESSION } from '../utils/mutations'

function Checkout() {
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
		<div className='flex flex-col items-center justify-center h-screen mx-auto'>
			<div className='text-center mb-4'>
				<h2 className='text-xl font-semibold'>Buy Credits</h2>
				<div className='my-2'>
					<p className='text-lg'>Choose a credit option:</p>
					<button
						onClick={() => handleCheckout('price_1ObEEvAA6kLI3uZeIaRFMTBQ')}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
						10 credits - $10
					</button>
				</div>
			</div>
		</div>
	)
}

export default Checkout
