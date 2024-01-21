import React from 'react'

const ProductDisplay = () => (
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
		<form
			action='/create-checkout-session'
			method='POST'>
			<button type='submit'>Checkout</button>
		</form>
	</section>
)

export default ProductDisplay
