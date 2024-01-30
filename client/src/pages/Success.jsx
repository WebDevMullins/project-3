import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider
} from '@nextui-org/react'
import { CheckCircleIcon } from 'lucide-react'

const SuccessPage = () => {
	// Define state and hooks
	const navigate = useNavigate() // Hook for navigating to different routes
	const [countdown, setCountdown] = useState(5) // State for countdown timer

	// Effect hook for countdown and redirection
	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1) // Update countdown timer every second
		}, 1000)

		const redirectTimer = setTimeout(() => {
			navigate('/generate') // Redirect to /generate route after 5 seconds
		}, 5000)

		// Clean up timers
		return () => {
			clearTimeout(timer)
			clearTimeout(redirectTimer)
		}
	}, [navigate]) // Dependency array to re-run effect when navigate changes

	// Render component
	return (
		<section className='flex justify-center w-full mx-auto my-32'>
			<Card className='py-4 px-8 bg-neutral-700/25 backdrop-blur-sm min-w-80'>
				<CardHeader className='flex-col gap-3'>
					<CheckCircleIcon
						size={64}
						className='text-green-700'
					/>{' '}
					{/* Success icon */}
				</CardHeader>
				<CardBody className='mb-4 text-center gap-2'>
					<h1 className='text-2xl font-semibold'>Success</h1>{' '}
					{/* Success message */}
					<p className='font-light text-gray-400 text-lg'>
						100 Credits Added
					</p>{' '}
					{/* Credit information */}
				</CardBody>
				<Divider /> {/* Divider */}
				<CardFooter className='flex flex-col mt-4 text-center'>
					<p className='font-light text-gray-400 text-sm'>
						Redirecting in {countdown} seconds... {/* Countdown message */}
					</p>
				</CardFooter>
			</Card>
		</section>
	)
}

export default SuccessPage
