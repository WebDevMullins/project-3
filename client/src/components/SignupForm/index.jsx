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

const SignupForm = ({
	isOpen,
	onOpenChange,
	openLoginModal,
	register,
	errors,
	handleSubmit,
	onSubmit
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement='center'>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className='flex flex-col gap-1'>Signup</ModalHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalBody>
								<div className='flex gap-2'>
									<Input
										autoFocus
										isRequired
										type='text'
										label='First Name'
										placeholder='Enter your first name'
										variant='bordered'
										isInvalid={errors.firstName?.message}
										errorMessage={errors.firstName?.message}
										{...register('firstName')}
									/>
									<Input
										isRequired
										type='text'
										label='Last Name'
										placeholder='Enter your last name'
										variant='bordered'
										isInvalid={errors.lastName?.message}
										errorMessage={errors.lastName?.message}
										{...register('lastName')}
									/>
								</div>
								<Input
									endContent={
										<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Email'
									placeholder='Enter your email'
									variant='bordered'
									isInvalid={errors.email?.message}
									errorMessage={errors.email?.message}
									{...register('email')}
								/>
								<Input
									endContent={
										<LockKeyholeIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Password'
									placeholder='Enter your password'
									type='password'
									variant='bordered'
									isInvalid={errors.password?.message}
									errorMessage={errors.password?.message}
									{...register('password')}
								/>
							</ModalBody>
							<ModalFooter className='flex justify-between'>
								<Link
									color='primary'
									onClick={openLoginModal}
									size='sm'
									className='cursor-pointer'>
									Already have an account? Log in
								</Link>
								<Button
									color='primary'
									type='submit'>
									Submit
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default SignupForm
