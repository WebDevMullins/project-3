import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider
} from '@nextui-org/react'
import { XCircleIcon } from 'lucide-react'

const NoMatch = () => {
	// Hook to handle navigation
	const navigate = useNavigate()
	// State to manage countdown
	const [countdown, setCountdown] = useState(5)

	// Effect hook to start countdown and redirect
	useEffect(() => {
		// Start countdown timer
		const timer = setInterval(() => {
			setCountdown((prevCoutdown) => prevCoutdown - 1)
		}, 1000)

		// Redirect timer after 5 seconds
		const redirectTimer = setTimeout(() => {
			// Navigate to '/generate' route
			navigate('/')
		}, 5000)

		// Cleanup function to clear timers
		return () => {
			clearTimeout(timer)
			clearTimeout(redirectTimer)
		}
	}, [navigate]) // Dependency array to ensure useEffect runs only on mount and unmount

	return (
		<section className='flex justify-center w-full mx-auto my-32'>
			{/* Card component to display success message */}
			<Card className='py-4 px-8 bg-neutral-700/25 backdrop-blur-sm min-w-80'>
				<CardHeader className='flex-col gap-3'>
					{/* Icon for error message */}
					<XCircleIcon
						size={64}
						className='text-red-700'
					/>
				</CardHeader>
				<CardBody className='mb-4 text-center gap-2'>
					{/* Heading for cancellation message */}
					<h1 className='text-2xl font-semibold'>Uh oh!</h1>
					{/* Subtitle for cancellation message */}
					<p className='font-light text-gray-400 text-lg'>
						Looks like you&apos;re lost!
					</p>
				</CardBody>
				<Divider />
				{/* Footer for countdown message */}
				<CardFooter className='flex flex-col mt-4 text-center'>
					<p className='font-light text-gray-400 text-sm'>
						{/* Countdown message */}
						Redirecting in {countdown} seconds...
					</p>
				</CardFooter>
			</Card>
		</section>
	)
}

export default NoMatch
