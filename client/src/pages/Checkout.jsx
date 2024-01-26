import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout() {
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const createStripeSession = async (credits) => {
		try {
			const response = await fetch('/api/create-stripe-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ credits })
			})

			const sessionData = await response.json()
			if (!response.ok) {
				throw new Error(sessionData.message || 'Error creating Stripe session')
			}

			navigate('/success', { state: { userSelection: credits } })

			window.location.href = sessionData.url
		} catch (err) {
			setError(err.message)
		}
	}

	const handleCheckout = (credits) => {
		console.log('Credits:', credits)

		createStripeSession(credits)
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen mx-auto'>
			<div className='text-center mb-4'>
				<h2 className='text-xl font-semibold'>Buy Credits</h2>
				{error && <p className='text-red-500'>{error}</p>}
				<div className='my-2'>
					<p className='text-lg'>Choose a credit option:</p>
					<button
						onClick={() => handleCheckout(5)}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
						5 credits - $5
					</button>
					<button
						onClick={() => handleCheckout(15)}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
						15 credits - $15
					</button>
					<button
						onClick={() => handleCheckout(25)}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2'>
						25 credits - $25
					</button>
				</div>
			</div>
		</div>
	)
}

export default Checkout
