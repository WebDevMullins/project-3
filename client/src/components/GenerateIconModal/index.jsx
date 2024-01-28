import {
	Button,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import IconCard from '../IconCard'

const GenerateIconModal = ({ iconUrl, isOpen, prompt }) => {
	return (
		<>
			<Modal
				isOpen={isOpen}
				backdrop='blur'
				hideCloseButton='true'
				isDismissable='false'
				isKeyboardDismissDisabled='true'
				placement='bottom-center'>
				<ModalContent>
					<ModalHeader className='flex flex-col gap-1 capitalize'>
						{prompt}
					</ModalHeader>
					<ModalBody className='w-full mx-auto items-center'>
						{iconUrl.map((url, index, prompt) => (
							<IconCard
								key={index}
								src={url}
								alt={prompt}
							/>
						))}
					</ModalBody>
					<ModalFooter>
						<Button
							as={Link}
							color='primary'
							variant='ghost'
							href='/dashboard'>
							Go to Gallery
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default GenerateIconModal
