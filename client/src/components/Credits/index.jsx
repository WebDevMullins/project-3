import { BadgeCentIcon } from 'lucide-react'

const Credits = ({ credits='500' }) => {
	return (
		<div className='flex gap-1 items-center'>
			<BadgeCentIcon
				size={18}
				className='text-primary'
			/>
			<p className='text-lg text-whtie font-bold'>{credits}</p>
		</div>
	)
}

export default Credits
