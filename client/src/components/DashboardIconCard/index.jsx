import {
	Card,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Image
} from '@nextui-org/react'
import { DownloadIcon, TrashIcon } from 'lucide-react'

const DashboardIconCard = ({ alt, src }) => {

	return (
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
			<Dropdown>
				<DropdownTrigger>
					<div className='absolute top-1 right-1 flex items-end justify-center bg-transparent backdrop-blur-xl p-2 text-sm rounded-xl'>
						<button>
							<svg
								stroke='currentColor'
								fill='currentColor'
								strokeWidth='0'
								viewBox='0 0 1024 1024'
								height='1em'
								width='1em'
								xmlns='http://www.w3.org/2000/svg'>
								<path d='M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z'></path>
							</svg>
						</button>
					</div>
				</DropdownTrigger>
				<DropdownMenu variant='faded'>
					<DropdownSection showDivider>
						<DropdownItem
							key='download'
							description='Download fullsize HD icon'
							download={alt}
							href={src}
							startContent={<DownloadIcon/>}>
							Download
						</DropdownItem>
					</DropdownSection>
					<DropdownSection title='Danger Zone'>
						<DropdownItem
							key='delete'
							color='danger'
							description='Permanently delete the icon'
							startContent={<TrashIcon />}>
							Delete
						</DropdownItem>
						Delete
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>
		</Card>
	)
}

export default DashboardIconCard
