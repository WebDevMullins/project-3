import { useQuery } from '@apollo/client'
import { Spinner } from '@nextui-org/spinner'
import { BadgeCentIcon } from 'lucide-react'
import { QUERY_ME } from '../../utils/queries'

const Credits = () => {
	const { loading, data } = useQuery(QUERY_ME)
	const user = data?.me || {}
	return (
		<div className='flex gap-1 items-center'>
			{loading ? (
				<Spinner size='sm' />
			) : (
				<>
					<BadgeCentIcon
						size={18}
						className='text-primary'
					/>
					<p className='text-lg text-white font-bold'>{user.credits}</p>
				</>
			)}
		</div>
	)
}

export default Credits
