import { Card, Image } from '@nextui-org/react'

const IconCard = ({ alt, src }) => {
	return (
		<Card
			radius='lg'
			className='border-none'>
			<Image
				src={src}
				alt={alt}
				title={alt}
				height={300}
				width={300}
				className='object-cover'
			/>
		</Card>
	)
}

export default IconCard
