import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider
} from '@nextui-org/react'
import { Button } from '@nextui-org/react'

const SuccessPage = () => {
	const [userData, setUserData] = useState(null)
	const [error, setError] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem('yourTokenKey') // Replace with your token key
				const response = await fetch('/api/get-user-data', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				if (!response.ok) {
					throw new Error('Failed to fetch user data')
				}
				const data = await response.json()
				setUserData(data)
			} catch (err) {
				setError(err.message)
			}
		}

		fetchUserData()
	}, [])

	const handleReturnHome = () => {
		navigate('/') // Redirect to the home page
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	if (!userData) {
		return <div>Loading...</div>
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
						<h1>Payment Successful!</h1>
						<p>Your new credit balance: {userData.credits}</p>
						<Button
							className='text-md'
							color='primary'
							radius='full'
							size='sm'
							onClick={handleReturnHome}>
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
