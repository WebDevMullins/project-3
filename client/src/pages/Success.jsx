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

	const handleReturnHome = () => {
		navigate('/') // Redirect to home page
	}

	return (

		<div className='flex flex-row justify-center w-full mx-auto my-40'>
			<section className='flex w-full justify-center align-center'>
				<Card className=''>
					<CardHeader className='flex-col gap-3'>
						<div className='flex flex-col'>
							<p className='text-md'>Congratulations</p>
							<p className='text-small text-default-500'>
								Your order has been placed successfully.
							</p>
						</div>
						<div className='flex'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-24 h-24 m-auto'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
								/>
							</svg>
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

export default SuccessPage
