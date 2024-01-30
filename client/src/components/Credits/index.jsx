import { BadgeCentIcon } from 'lucide-react'
import { useSelector } from 'react-redux'

const Credits = () => {
	const credits = useSelector((state) => state.user.credits)
	return (
		<div className='flex gap-1 items-center'>
			<BadgeCentIcon
				size={18}
				className='text-primary'
			/>
			<p className='text-lg text-white font-bold'>{credits}</p>
		</div>
	)
}

export default Credits
