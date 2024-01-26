import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Button
} from '@nextui-org/react'

const priceIds = {
	5: 5,
	15: 15,
	25: 25
}

const SuccessPage = () => {
	const [userData, setUserData] = useState(null)
	const [error, setError] = useState('')
	const location = useLocation()
	const navigate = useNavigate()
	const userSelection = location.state?.userSelection

	useEffect(() => {
		const updateCredits = async () => {
			const creditAmount = priceIds[userSelection]
			try {
				const response = await fetch('/graphql', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						query: `
                           mutation UpdateCredits($credits: Int!) {
                              updateCredits(credits: $credits) {
                                    _id
                                    credits
                              }
                           }
                        `,
						variables: {
							credits: creditAmount
						}
					})
				})

				if (!response.ok) {
					throw new Error('Failed to update credits')
				}
				const responseBody = await response.json()
				if (responseBody.errors) {
					throw new Error(
						responseBody.errors.map((error) => error.message).join('\n')
					)
				}
				setUserData(responseBody.data.updateCredits)
			} catch (err) {
				setError(err.message)
				console.log('Test')
			}
		}

		if (userSelection) {
			updateCredits()
		}
	}, [userSelection])

	const handleReturnHome = () => {
		navigate('/') // Redirect to home page
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
						<p>Your new credit balance: {userData?.credits}</p>
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
