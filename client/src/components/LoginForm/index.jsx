import { zodResolver } from '@hookform/resolvers/zod'
import Auth from '@utils/auth'
import { LOGIN } from '@utils/mutations'
import { useForm } from 'react-hook-form'

import { useMutation } from '@apollo/client'
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
	const [login, { error }] = useMutation(LOGIN)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({ mode: 'onBlur', resolver: zodResolver(loginSchema) })

	const onSubmit = async (data) => {
		try {
			const mutationResponse = await login({
				variables: { email: data.email, password: data.password }
			})
			const token = mutationResponse.data.login.token
			Auth.login(token)
		} catch (e) {
			console.log(e)
		}
		console.log('Login data:', data)
		console.log('Login errors:', errors)
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
							<ModalFooter className='flex flex-col'>
								{error ? (
									<p className='text-red-500 text-sm text-center'>
										{error.message}
									</p>
								) : null}
								<div className='flex justify-between'>
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
								</div>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default LoginForm
