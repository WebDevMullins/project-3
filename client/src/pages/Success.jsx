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
	const navigate = useNavigate()
	const [countdown, setCountdown] = useState(5)

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCoutdown) => prevCoutdown - 1)
		}, 1000)

		const redirectTimer = setTimeout(() => {
			navigate('/generate')
		}, 5000)
		return () => {
			clearTimeout(timer)
			clearTimeout(redirectTimer)
		}
	}, [navigate])

	return (
		<section className='flex justify-center w-full mx-auto my-32'>
			<Card className='py-4 px-8 bg-neutral-700/25 backdrop-blur-sm min-w-80'>
				<CardHeader className='flex-col gap-3'>
					<CheckCircleIcon
						size={64}
						className='text-green-700'
					/>
				</CardHeader>
				<CardBody className='mb-4 text-center gap-2'>
					<h1 className='text-2xl font-semibold'>Success</h1>
					<p className='font-light text-gray-400 text-lg'>100 Credits Added</p>
				</CardBody>
				<Divider />
				<CardFooter className='flex flex-col mt-4 text-center'>
					<p className='font-light text-gray-400 text-sm'>
						Redirecting in {countdown} seconds...
					</p>
				</CardFooter>
			</Card>
		</section>
	)
}

export default SuccessPage
