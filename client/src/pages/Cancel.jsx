import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
	Button
} from '@nextui-org/react'

const CancelPage = () => {
	const navigate = useNavigate()
	const handleReturnHome = () => {
		navigate('/') // Redirect to home page
	}

	// const pageStyle = {
	// 	display: 'flex',
	// 	flexDirection: 'column',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	height: '100vh',
	// 	textAlign: 'center',
	// 	backgroundColor: '#f2f2f2',
	// 	color: '#333',
	// 	fontFamily: 'Arial, sans-serif'
	// }

	// const buttonStyle = {
	// 	marginTop: '20px',
	// 	padding: '10px 20px',
	// 	fontSize: '16px',
	// 	color: '#fff',
	// 	backgroundColor: '#007bff',
	// 	border: 'none',
	// 	borderRadius: '5px',
	// 	cursor: 'pointer'
	// }

	return (
		// <div style={pageStyle}>
		// 	<h1>Order Canceled</h1>
		// 	<p>Your order has been successfully canceled.</p>
		// 	<button
		// 		style={buttonStyle}
		// 		onClick={handleReturnHome}>
		// 		Return to Home
		// 	</button>
		// </div>

		<div class='flex flex-row justify-center w-full mx-auto my-40'>
			<section class='flex w-full justify-center align-center'>
				<Card className=''>
					<CardHeader className='flex-col gap-3'>
						<div className='flex flex-col'>
							<p className='text-lg font-bold'>Order Cancelled</p>
							<p className='text-small text-default-500'>
								Your Order has been Cancelled
							</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<Button
							className='text-md'
							color='primary'
							radius='full'
							size='sm'
							onPress={handleReturnHome}>
							Return to Home
						</Button>
					</CardBody>
					<Divider />
					<CardFooter>
						<p className='text-small text-default-500'>
							You will now be navigated to the Home page.
						</p>
					</CardFooter>
				</Card>
			</section>
		</div>
	)
}

export default CancelPage
