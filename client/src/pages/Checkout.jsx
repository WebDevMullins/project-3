import React, { useState, useEffect } from 'react'
import OrderPreview from '../components/OrderPreview'
import ProductDisplay from '../components/ProductDisplay'
import Message from '../components/Message'

function Checkout() {
	const [order] = useState({
		items: [
			{ name: 'Product 1', price: 10.99 },
			{ name: 'Product 2', price: 5.49 }
			// Add more items here
		]
	})
	const [message, setMessage] = useState('')

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

	return (
		<div>
			{message ? <Message message={message} /> : <ProductDisplay />}
			<OrderPreview order={order} />
		</div>
	)
}

export default Checkout
