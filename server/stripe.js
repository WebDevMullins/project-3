module.exports = function (app) {
	const Stripe = require('stripe')
	const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
	const express = require('express')
	const User = require('./models/User')

	const SUCCESS_URL = process.env.SUCCESS_URL
	const CANCEL_URL = process.env.CANCEL_URL

	// Create a checkout session
	app.post('/create-checkout-session', async (req, res) => {
		const { amount } = req.body

		try {
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],

				line_items: [
					{
						price_data: {
							currency: 'usd',
							product_data: {
								name: `Credits`
							},
							unit_amount: amount
						},
						quantity: 1
					}
				],
				mode: 'payment',
				success_url: SUCCESS_URL,
				cancel_url: CANCEL_URL
			})

			res.json({ id: session.id })
		} catch (error) {
			console.error('Webhook Error:', err)
			return response.status(400).send(`Webhook Error: ${err.message}`)

			res.status(500).send(error.message)
		}
	})

	// Hook handle post-payment events
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
			} catch (err) {
				return response.status(400).send(`Webhook Error: ${err.message}`)
			}

			if (event.type === 'checkout.session.completed') {
				const session = event.data.object
				const userEmail = session.metadata.userEmail // Retrieve user's email from the session metadata

				try {
					// Update user's credits
					await User.findOneAndUpdate(
						{ email: userEmail },
						{ $inc: { credits: 10 /* amount to increment */ } },
						{ new: true }
					)
				} catch (err) {
					console.error('Error updating user credits:', err)
					response.status(500).end()
					return
				}
			}

			response.status(200).send({ received: true })
		}
	)
}
