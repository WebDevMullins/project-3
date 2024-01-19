import {
	Button,
	Input,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure
} from '@nextui-org/react'

import { LockKeyholeIcon, MailIcon } from 'lucide-react'

const AuthForm = () => {
	const { isOpen: signupOpen, onOpen: openSignup, onOpenChange: onSignupOpenChange } = useDisclosure();
  const { isOpen: loginOpen, onOpen: openLogin, onOpenChange: onLoginOpenChange } = useDisclosure();

	// Close the login modal when signup is opened
  const openSignupModal = () => {
    onLoginOpenChange(false);
    openSignup();
  };

  // Close the signup modal when login is opened
  const openLoginModal = () => {
    onSignupOpenChange(false);
    openLogin();
  };

	return (
		<>
			<Button
				onPress={openSignup}
				color='primary'>
				Sign Up
			</Button>
			<Modal
				isOpen={signupOpen}
				onOpenChange={onSignupOpenChange}
				placement='center'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Signup</ModalHeader>
							<ModalBody>
								<div className='flex gap-2'>
									<Input
										autoFocus
										isRequired
										type='text'
										label='First Name'
										placeholder='Enter your first name'
										variant='bordered'
									/>
									<Input
										isRequired
										type='text'
										label='Last Name'
										placeholder='Enter your last name'
										variant='bordered'
									/>
								</div>
								<Input
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
										// href='#'
										onClick={openLoginModal}
										size='sm'
										className='cursor-pointer'>
										Already have an account? Log in
									</Link>
								<Button
									color='primary'
									onPress={onClose}>
									Submit
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>

			{/* Login Modal */}
			<Button
				onPress={openLogin}
				color='primary'>
				Log In
			</Button>
			<Modal
				isOpen={loginOpen}
				onOpenChange={onLoginOpenChange}
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
		</>
	)
}

export default AuthForm
