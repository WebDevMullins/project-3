module.exports = function (app) {
	require('dotenv').config()
	const jwt = require('jsonwebtoken')
	const User = require('./models/User')

	const Stripe = require('stripe')
	const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
	const express = require('express')

	const SUCCESS_URL = process.env.SUCCESS_URL
	const CANCEL_URL = process.env.CANCEL_URL

	// Create a checkout session
	app.post('/create-checkout-session', async (req, res) => {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			const userId = decoded.data._id // Extract user ID from token
			const user = await User.findById(userId) // Fetch user from database

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: [
					{
						price_data: {
							currency: 'usd',
							product_data: {
								name: `Credits`
							},
							unit_amount: 1000 // Set the amount (e.g., 1000 for $10.00)
						},
						quantity: 1
					}
				],
				mode: 'payment',
				success_url: SUCCESS_URL,
				cancel_url: CANCEL_URL,
				metadata: {
					userId: user._id.toString() // Pass user ID in metadata for further processing
				}
			})

			res.json({ id: session.id })
		} catch (error) {
			console.error('Error creating checkout session:', error)
		}
	})

	// Hook handle post-payment events
	app.post(
		'/webhook',
		express.raw({ type: 'application/json' }),
		async (request, response) => {
			const sig = request.headers['stripe-signature']
			let event

			try {
				event = stripe.webhooks.constructEvent(
					request.body,
					sig,
					process.env.STRIPE_WEBHOOK_SECRET
				)
				console.log('Webhook event received:', event.type)
			} catch (err) {
				console.error('Error in webhook signature verification:', err)
				return response.status(400).send(`Webhook Error: ${err.message}`)
			}

			if (event.type === 'checkout.session.completed') {
				const session = event.data.object
				const userId = session.metadata.userId

				try {
					console.log('Updating credits for user:', userId)

					// Update user's credits
					const updatedUser = await User.findByIdAndUpdate(
						userId,
						{ $inc: { credits: 10 } }, // Increment credits
						{ new: true }
					)
					console.log('Updated user:', updatedUser)
				} catch (err) {
					console.error('Error updating user credits:', err)
					response.status(500).end()
					return
				}
			}

			response.status(200).send({ received: true })
		}
	)

	app.post('/update-credits', async (req, res) => {
		try {
			const token = req.headers.authorization.split(' ')[1] // Assuming token is sent in the Authorization header
			const decoded = jwt.verify(token, process.env.JWT_SECRET) // Replace JWT_SECRET with your secret key

			const userId = decoded.data._id // Or however your user ID is stored in the token

			// Find the user and update credits
			const updatedUser = await User.findByIdAndUpdate(
				userId,
				{ $inc: { credits: req.body.credits } }, // Increment credits by the given amount
				{ new: true }
			)

			if (!updatedUser) {
				return res.status(404).send('User not found')
			}

			res.send(updatedUser)
		} catch (error) {
			console.error(error)
			res.status(500).send('Error updating credits')
		}
	})
}
