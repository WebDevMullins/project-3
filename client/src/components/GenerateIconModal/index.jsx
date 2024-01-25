import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react'
import IconCard from '../IconCard'

const GenerateIconModal = ({ iconUrl, isOpen, onClose, prompt }) => {

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
        backdrop='blur'
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
							color='danger'
							variant='light'
							onPress={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default GenerateIconModal
