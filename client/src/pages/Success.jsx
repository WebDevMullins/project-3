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

const SuccessPage = () => {
	const navigate = useNavigate()

	const handleReturnToHome = () => {
		navigate('/')
	}

	return (
		<div className='flex flex-row justify-center w-full mx-auto my-40'>
			<section className='flex w-full justify-center align-center'>
				<Card>
					<CardHeader className='flex-col gap-3'>
						<div className='flex flex-col'>
							<p className='text-md'>Congratulations</p>
							<p className='text-small text-default-500'>
								Your order has been placed successfully.
							</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<h1>Payment Successful!</h1>
						<h3>10 Credit Added to Your Balance</h3>
						<Button
							className='text-md'
							color='primary'
							radius='full'
							size='sm'
							onClick={handleReturnToHome}>
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

export default SuccessPage
