import React from 'react'
import { useMutation, gql } from '@apollo/client'

const CHECKOUT_SESSION_MUTATION = gql`
	mutation CreateCheckoutSession($lineItems: [LineItemInput]) {
		createCheckoutSession(lineItems: $lineItems) {
			id
			url
		}
	}
`
const ProductDisplay = () => {
	const [createCheckoutSession] = useMutation(CHECKOUT_SESSION_MUTATION)

	const handleCheckout = async () => {
		try {
			const lineItems = [
				{ price: 'price_1OanpvAA6kLI3uZeOmeuRKv5', quantity: 1 }
				// ...other line items
			]

			const { data } = await createCheckoutSession({ variables: { lineItems } })
			window.location.href = data.createCheckoutSession.url
		} catch (error) {
			console.error('Error creating checkout session:', error)
		}
	}

	return (
		<section>
			<div className='product'>
				<img
					src='https://images.pexels.com/photos/6765371/pexels-photo-6765371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1s'
					alt='Picture of a coin'
				/>
				<div className='description'>
					<h3>Test Credit</h3>
					<h5>$20.00</h5>
				</div>
			</div>
			<button onClick={handleCheckout}>Checkout</button>
		</section>
	)
}

export default ProductDisplay
