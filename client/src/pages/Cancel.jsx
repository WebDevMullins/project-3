import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Button
} from '@nextui-org/react'

const CancelPage = () => {
	const navigate = useNavigate()
	const handleReturnHome = () => {
		navigate('/') // Redirect to home page
	}

	return (
		<div className='flex flex-row justify-center w-full mx-auto my-40'>
			<section className='flex w-full justify-center align-center'>
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
