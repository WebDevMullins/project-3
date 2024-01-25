require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require('./models/User')
const express = require('express')

module.exports = function (app) {
	// STRIPE CHECKOUT SESSION
	app.use(express.json())

	app.post('/api/create-stripe-session', async (req, res) => {
		try {
			const { credits } = req.body
			console.log('Received credits:', credits)

			const priceIds = {
				5: process.env.FIVE_CREDITS,
				15: process.env.FIFTEEN_CREDITS,
				25: process.env.TWENTY_FIVE_CREDITS
			}

			const priceId = priceIds[credits]
			if (!priceId) {
				throw new Error('Invalid credit amount')
			}

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: [
					{
						price: priceId,
						quantity: 1
					}
				],
				mode: 'payment',
				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/cancel`
			})

			res.json({ url: session.url })
		} catch (error) {
			console.error('Error in create-stripe-session:', error)

			res.status(500).json({ message: error.message })
		}
	})

	// STRIPE WEBHOOK
	app.post(
		'/webhook',
		express.raw({ type: 'application/json' }),
		async (req, res) => {
			const signature = req.headers['stripe-signature']
			let event

			try {
				event = stripe.webhooks.constructEvent(
					req.body,
					signature,
					process.env.STRIPE_WEBHOOK_SECRET
				)
			} catch (err) {
				return res.status(400).send(`Webhook Error: ${err.message}`)
			}

			if (event.type === 'checkout.session.completed') {
				const session = event.data.object

				const userId = session.metadata.userId
				const creditsToAdd = parseInt(session.metadata.credits)

				try {
					// Update user's credits in the database
					await User.findByIdAndUpdate(userId, {
						$inc: { credits: creditsToAdd }
					})
				} catch (error) {
					console.error('Error updating user credits:', error)
					// Handle database update errors
					return res.status(500).send('Error updating user credits')
				}
			}

			res.status(200).json({ received: true })
		}
	)

	// STRIPE GET USER DATA !!!AUTH NEEDED!!!
	// app.get('/api/get-user-data', async (req, res) => {
	// 	try {
	// 		if (!req.user) {
	// 			return res.status(401).json({ message: 'Not authenticated' })
	// 		}

	// 		const userId = req.user._id // Assuming _id is part of the user data in the token

	// 		const user = await User.findById(userId)

	// 		if (!user) {
	// 			return res.status(404).json({ message: 'User not found' })
	// 		}

	// 		res.json(user)
	// 	} catch (error) {
	// 		console.error('Error in get-user-data:', error)
	// 		res.status(500).json({ message: 'Internal server error' })
	// 	}
	// })

	// NO AUTH STRIPE USER DATA
	app.get('/api/get-user-data', async (req, res) => {
		try {
			const user = await User.findOne()

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			res.json(user)
		} catch (error) {
			console.error('Error in get-user-data:', error)
			res.status(500).json({ message: 'Internal server error' })
		}
	})
}
