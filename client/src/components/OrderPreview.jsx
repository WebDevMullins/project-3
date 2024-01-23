import React from 'react'

const OrderPreview = ({ order }) => {
	if (!order || order.items.length === 0) {
		return <div className='text-center p-5'>No items in your order.</div>
	}

	return (
		<div className='max-w-2xl mx-auto p-4 bg-white shadow-md'>
			<h2 className='text-lg font-semibold mb-4'>Order Preview</h2>
			<div className='mb-4'>
				{order.items.map((item, index) => (
					<div
						key={index}
						className='flex justify-between border-b py-2'>
						<span>{item.name}</span>
						<span>${item.price.toFixed(2)}</span>
					</div>
				))}
			</div>
			<div className='text-right font-semibold'>
				Total: $
				{order.items.reduce((total, item) => total + item.price, 0).toFixed(2)}
			</div>
		</div>
	)
}

export default OrderPreview
