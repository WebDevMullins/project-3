import {
	Button,
	Divider,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import { XCircleIcon } from 'lucide-react'

const ErrorModal = ({ isOpen, error }) => {
	return (
		<>
			<Modal
				isOpen={isOpen}
				backdrop='blur'
				hideCloseButton='true'
				isDismissable='false'
				isKeyboardDismissDisabled='true'
				placement='bottom-center'>
				<ModalContent className='py-4 px-8 min-w-80'>
					<ModalHeader className='justify-center'>
						<XCircleIcon
							size={64}
							className='text-red-700'
						/>
					</ModalHeader>
					<ModalBody className='w-full mx-auto mb-4 items-center'>
						<h1 className='text-2xl font-semibold'>Oh no!</h1>
						<p className='font-light text-gray-400 text-lg'>
							{error.message}
						</p>
					</ModalBody>
					<Divider />
					<ModalFooter className='flex flex-col mt-4 text-center'>
						<Button
							as={Link}
							color='primary'
							variant='ghost'
							href='/pricing'>
							Buy Credits
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ErrorModal
