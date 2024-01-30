import React from 'react'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure
} from '@nextui-org/react'

function TeamModal(props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<Button
				onPress={onOpen}
				className='mx-auto mb-4 w-36 h-36 rounded-full bg-opacity-0'>
				<img
					className='rounded-full'
					src='https://avatars.githubusercontent.com/u/6474546?v=4'
					alt='Brandon Avatar'
				/>
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Modal Title</ModalHeader>
							<ModalBody>data.clay</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='light'
									onPress={onClose}>
									Close
								</Button>
								<Button
									color='primary'
									onPress={onClose}>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default TeamModal
