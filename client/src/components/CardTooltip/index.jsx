import { Divider, Tooltip } from '@nextui-org/react'

const CardTooltip = ({ alt, author, createdDate, children }) => {
	return (
		<Tooltip
			content={
				<div className='flex flex-col px-1 py-2 gap-2'>
					<h1 className='text-small font-bold capitalize'>{alt}</h1>
					<Divider />
					<p className='text-tiny'>Designed by {author}</p>
					<p className='text-tiny'>Created on {createdDate}</p>
				</div>
			}>
			{children}
		</Tooltip>
	)
}

export default CardTooltip
