import { Card, Image } from '@nextui-org/react'
import { dateFormat } from '@utils/helpers'
import CardTooltip from '../CardTooltip'

const IconCard = ({ alt, author, color, date, src, style }) => {
	const createdDate = dateFormat(date)
	return (
		<CardTooltip
			alt={alt}
			author={author}
			color={color}
			createdDate={createdDate}
			style={style}
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
