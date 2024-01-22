import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import { loginSchema } from '@utils/validation'
import { LockKeyholeIcon, MailIcon } from 'lucide-react'

const LoginForm = ({ isOpen, onOpenChange, openSignupModal }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({ mode: 'onBlur', resolver: zodResolver(loginSchema) })

	const onSubmit = async (data) => {
		console.log('Signup data:', data)
		console.log('signup errors:', errors)
		reset()
	}
	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement='center'>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className='flex flex-col gap-1'>Login</ModalHeader>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalBody>
								<Input
									autoFocus
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
									onClick={openSignupModal}
									size='sm'
									className='cursor-pointer'>
									Don&apos;t have an account? Sign up
								</Link>
								<Button
									color='primary'
									type='submit'>
									Log In
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default LoginForm
