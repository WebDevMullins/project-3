import {
	Button,
	Input,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'

import { LockKeyholeIcon, MailIcon } from 'lucide-react'

const LoginForm = ({ isOpen, onOpenChange, openSignupModal }) => {
	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement='center'>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>Login</ModalHeader>
						<ModalBody>
							<Input
								autoFocus
								endContent={
									<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Email'
								placeholder='Enter your email'
								variant='bordered'
							/>
							<Input
								endContent={
									<LockKeyholeIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
								}
								label='Password'
								placeholder='Enter your password'
								type='password'
								variant='bordered'
							/>
						</ModalBody>
						<ModalFooter className='flex justify-between'>
							<Link
								color='primary'
								onClick={openSignupModal}
								size='sm'
								className='cursor-pointer'>
								Don&apos;t have an account? Sign up
							</Link>
							<Button
								color='primary'
								onPress={onClose}>
								Log In
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default LoginForm
