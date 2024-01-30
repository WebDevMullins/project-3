module.exports = function (app) {
	require('dotenv').config()
	// const jwt = require('jsonwebtoken')
	const User = require('./models/User')

	const Stripe = require('stripe')
	const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
	const express = require('express')

	// Hook handle post-payment events
	app.post(
		'/webhook',
		express.raw({ type: 'application/json' }),
		async (req, res) => {
			const sig = req.headers['stripe-signature']
			let event

			try {
				event = stripe.webhooks.constructEvent(
					req.body,
					sig,
					process.env.STRIPE_WEBHOOK_SECRET
				)
				console.log('Webhook event received:', event.type)
			} catch (err) {
				console.error('Error in webhook signature verification:', err)
				return res.status(400).send(`Webhook Error: ${err.message}`)
			}

			switch (event.type) {
				case 'checkout.session.completed':
					const session = event.data.object
					const userId = session.metadata.userId
					const checkoutComplete = event.data.object
					try {
						console.log('Updating credits for user:', userId)

						// Update user's credits
						await User.findByIdAndUpdate(
							checkoutComplete.metadata.userId,
							{ $inc: { credits: 100 } }, // Increment credits
							{ new: true }
						)
						// console.log('Updated user:', updatedUser)
					} catch (err) {
						console.error('Error updating user credits:', err)
						res.status(500).end()
						return
					}
			}

			res.status(200).send({ received: true })
		}
	)

	// app.post('/update-credits', async (req, res) => {
	// 	try {
	// 		const token = req.headers.authorization.split(' ')[1] // Assuming token is sent in the Authorization header
	// 		const decoded = jwt.verify(token, process.env.JWT_SECRET) // Replace JWT_SECRET with your secret key

	// 		const userId = decoded.data._id // Or however your user ID is stored in the token

	// 		// Find the user and update credits
	// 		const updatedUser = await User.findByIdAndUpdate(
	// 			userId,
	// 			{ $inc: { credits: req.body.credits } }, // Increment credits by the given amount
	// 			{ new: true }
	// 		)

	// 		if (!updatedUser) {
	// 			return res.status(404).send('User not found')
	// 		}

	// 		res.send(updatedUser)
	// 	} catch (error) {
	// 		console.error(error)
	// 		res.status(500).send('Error updating credits')
	// 	}
	// })
}
