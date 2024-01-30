import { useQuery } from '@apollo/client'

import IconCard from '@components/IconCard'
import { Spinner } from '@nextui-org/react'
import { QUERY_COMMUNITY_ICONS } from '@utils/queries'

export default function Community() {
	// Query to fetch community icons
	const { loading, data } = useQuery(QUERY_COMMUNITY_ICONS)
	// Extract icons data or set to an empty array if data is not available
	const icons = data?.communityIcons || []

	// Render loading spinner if data is loading
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
		// Render community icons gallery when data is loaded
		return (
			<section className='flex flex-row justify-center md:px-24 mx-auto my-16 bg-neutral-700/25 backdrop-blur-xs rounded'>
				<div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
					<div className='mx-auto mb-8 max-w-screen-sm lg:mb-16'>
						{/* Heading for community gallery */}
						<h2 className='mb-4 text-4xl tracking-tight font-extrabold text-white'>
							Community Gallery
						</h2>
						{/* Subtitle for community gallery */}
						<p className='font-light text-gray-400 sm:text-xl dark:text-gray-400'>
							The most recent icons created by the community
						</p>
					</div>
					<div>
						{/* Grid to display community icons */}
						<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
							{icons.map((icon) => (
								// Render each icon using IconCard component
								<IconCard
									key={icon._id}
									src={icon.url}
									alt={icon.prompt}
									author={icon.user ? icon.user.firstName : 'Unknown'}
									color={icon.color}
									date={icon.createdAt}
									style={icon.style}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		)
	}
}
