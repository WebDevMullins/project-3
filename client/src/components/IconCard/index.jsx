import { Card, Image, Tooltip } from '@nextui-org/react'
import { dateFormat } from '@utils/helpers'

const IconCard = ({ alt, author, date, src }) => {
	const createdDate = dateFormat(date)
	console.log('date:', date)
	console.log('cdate:', createdDate)
	return (
		<Tooltip
			content={
				<div className='px-1 py-2'>
					<div className='text-small font-bold capitalize'>{alt}</div>
					<div className='text-tiny'>Designed by {author}</div>
					<div className='text-tiny'>Created on {createdDate}</div>
				</div>
			}>
			<Card
				radius='lg'
				className='border-none'>
				<Image
					src={src}
					alt={alt}
					height={300}
					width={300}
					className='object-cover'
				/>
			</Card>
		</Tooltip>
	)
}

export default IconCard
