import { Chip, Divider, Tooltip } from '@nextui-org/react'

const CardTooltip = ({ alt, author, color, createdDate, style, children }) => {
	return (
		<Tooltip
			offset={-10}
			delay={500}
			closeDelay={500}
			motionProps={{
				variants: {
					exit: {
						opacity: 0,
						transition: {
							duration: 0.2,
							ease: 'easeIn'
						}
					},
					enter: {
						opacity: 1,
						transition: {
							duration: 0.25,
							ease: 'easeOut'
						}
					}
				}
			}}
			content={
				<div className='flex flex-col px-1 py-2 gap-2'>
					<h1 className='text-small font-bold capitalize'>{alt}</h1>
					<Divider />
					<div className='flex flex-col gap-2'>
						<div className='flex justify-between'>
							<Chip
								size='sm'
								variant='bordered'>
								{style}
							</Chip>
							<Chip
								size='sm'
								variant='dot'>
								{color}
							</Chip>
						</div>
						<p className='text-tiny'>Designed by {author}</p>
						<p className='text-tiny'>Created on {createdDate}</p>
					</div>
				</div>
			}>
			{children}
		</Tooltip>
	)
}

export default CardTooltip
