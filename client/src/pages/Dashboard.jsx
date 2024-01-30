import { useMutation, useQuery } from '@apollo/client'

import DashboardIconCard from '@components/DashboardIconCard'
import { Button, Link, Spinner } from '@nextui-org/react'
import { DELETE_ICON } from '@utils/mutations'
import { QUERY_ME } from '@utils/queries'

export default function Dashboard() {
	// Query to fetch user data
	const { loading, data } = useQuery(QUERY_ME)
	// Mutation to delete an icon
	const [deleteIcon, { error }] = useMutation(DELETE_ICON, {
		// Refetch user data after icon deletion
		refetchQueries: [{ query: QUERY_ME }]
	})
	// Extract user data or set to an empty object if data is not available
	const user = data?.me || {}

	// Function to handle icon deletion
	const handleDeleteIcon = async (iconId) => {
		try {
			// Call deleteIcon mutation with iconId
			await deleteIcon({
				variables: { _id: iconId }
			})
		} catch (err) {
			console.error('Error deleting icon', err.message)
			throw new Error(error)
		}
	}

	// Render loading spinner while data is loading
	if (loading) {
		return (
			<section className='flex justify-center items-center min-h-screen'>
				<Spinner
					label='Loading...'
					size='lg'
				/>
			</section>
		)
	} else {
		// Render user's icon gallery when data is loaded
		return (
			<section className='flex flex-row justify-center md:px-24 mx-auto my-16 bg-neutral-700/25 backdrop-blur-xs rounded'>
				<div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
					<div className='mx-auto mb-8 max-w-screen-sm lg:mb-16'>
						{/* Display welcome message with user's first name */}
						<h2 className='mb-4 text-4xl tracking-tight font-extrabold text-white'>
							Welcome, {user.firstName}!
						</h2>
						{/* Subtitle for user's icon gallery */}
						<p className='font-light text-gray-400 sm:text-xl dark:text-gray-400'>
							This is your gallery of icons
						</p>
					</div>
					<div>
						{user.icons ? (
							// Render user's icons if available
							<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
								{user.icons.map((icon) => (
									// Render each icon using DashboardIconCard component
									<DashboardIconCard
										key={icon._id}
										src={icon.url}
										alt={icon.prompt}
										author={user.firstName ? user.firstName : 'Unknown'}
										color={icon.color}
										date={icon.createdAt}
										style={icon.style}
										// Pass onDelete function to handle icon deletion
										onDelete={() => handleDeleteIcon(icon._id)}
									/>
								))}
							</div>
						) : (
							// Render message if user has no icons
							<>
								<h3>There are no icons in your gallery yet.</h3>
								{/* Button to generate new icons */}
								<Button
									as={Link}
									color='primary'
									href='/generate'>
									Generate
								</Button>
							</>
						)}
					</div>
				</div>
			</section>
		)
	}
}
