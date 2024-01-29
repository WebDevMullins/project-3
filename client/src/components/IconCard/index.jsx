import { Card, Image } from '@nextui-org/react'
import { dateFormat } from '@utils/helpers'
import CardTooltip from '../CardTooltip'

const IconCard = ({ alt, author, date, src }) => {
	const createdDate = dateFormat(date)
	return (
		<CardTooltip
			alt={alt}
			author={author}
			createdDate={createdDate}
			>
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
		</CardTooltip>
	)
}

export default IconCard
