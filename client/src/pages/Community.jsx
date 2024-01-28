import { useQuery } from '@apollo/client'

import IconCard from '@components/IconCard'
import { Spinner } from '@nextui-org/react'
import { QUERY_COMMUNITY_ICONS } from '@utils/queries'

export default function Community() {
	const { loading, data } = useQuery(QUERY_COMMUNITY_ICONS)
	console.log('Community Icons:', data)
	const icons = data?.communityIcons || []

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
		return (
			<section className='flex flex-row justify-center w-full mx-auto my-16 bg-neutral-700/25 backdrop-blur-xs rounded'>
				<div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
					<div className='mx-auto mb-8 max-w-screen-sm lg:mb-16'>
						<h2 className='mb-4 text-4xl tracking-tight font-extrabold text-white'>
							Community Gallery
						</h2>
						<p className='font-light text-gray-500 sm:text-xl dark:text-gray-400'>
							The most recent icons created by the community
						</p>
					</div>
					<div>
						<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
							{icons.map((icon) => (
								<IconCard
									key={icon._id}
									src={icon.url}
									alt={icon.prompt}
									title={icon.prompt}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		)
	}
}
