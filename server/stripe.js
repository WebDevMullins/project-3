// const express = require('express')
// const stripe = require('stripe')(
// 	'sk_test_51Oa8aqAA6kLI3uZebzOwHrO7vVUAqHjD4XyIG2kSK8JQOd9ikMlUtzTnmVHXcSXwnprJJS6BF9pgytWd4qGkaeuF00LancRa3X'
// )
// const router = express.Router()
// const app = express()

// app.use(express.static('public'))

// const YOUR_DOMAIN = 'http://localhost:4242'

// // Boiler Plate Strip Post Request
// // app.post('/create-checkout-session', async (req, res) => {
// // 	const session = await stripe.checkout.sessions.create({
// // 		line_items: [
// // 			{
// // 				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
// // 				price: 'price_1OanpvAA6kLI3uZeOmeuRKv5',
// // 				quantity: 1
// // 			},
// // 			{
// // 				price: 'price_1OanqAAA6kLI3uZev2uOdODb',
// // 				quantity: 1
// // 			},
// // 			{
// // 				price: 'price_1OanqNAA6kLI3uZe1ngplSkW',
// // 				quantity: 1
// // 			}
// // 		],
// // 		mode: 'payment',
// // 		success_url: `${YOUR_DOMAIN}?success=true`,
// // 		cancel_url: `${YOUR_DOMAIN}?canceled=true`
// // 	})

// // 	res.redirect(303, session.url)
// // })
