import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import OrderPreview from '../components/OrderPreview'
import ProductDisplay from '../components/ProductDisplay'
import Message from '../components/Message'

const CHECKOUT_SESSION_MUTATION = gql`
	mutation CreateCheckoutSession($lineItems: [LineItemInput]) {
		createCheckoutSession(lineItems: $lineItems) {
			id
			url
		}
	}
`

function Checkout() {
	const [order] = useState({
		items: [
			{ name: 'Product 1', price: 10.99 },
			{ name: 'Product 2', price: 5.49 }
			// Add more items here
		]
	})
	const [message, setMessage] = useState('')
	const [createCheckoutSession] = useMutation(CHECKOUT_SESSION_MUTATION)

	useEffect(() => {
		const query = new URLSearchParams(window.location.search)
		if (query.get('success')) {
			setMessage('Order placed! You will receive an email confirmation.')
		}
		if (query.get('canceled')) {
			setMessage(
				"Order canceled -- continue to shop around and checkout when you're ready."
			)
		}
	}, [])

	const handleCheckout = async () => {
		try {
			const lineItems = order.items.map((item) => ({
				price: item.priceId,
				quantity: 1
			}))

			const { data } = await createCheckoutSession({ variables: { lineItems } })
			window.location.href = data.createCheckoutSession.url
		} catch (error) {
			console.error('Error creating checkout session:', error)
		}
	}

	return (
		<div>
			{message ? <Message message={message} /> : <ProductDisplay />}
			<OrderPreview order={order} />
			<button onClick={handleCheckout}>Checkout</button>
		</div>
	)
}

export default Checkout
