import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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
import Auth from '@utils/auth'
import { LOGIN } from '@utils/mutations'
import { loginSchema } from '@utils/validation'
import { EyeIcon, EyeOffIcon, MailIcon } from 'lucide-react'

const LoginForm = ({ isOpen, onOpenChange, openSignupModal }) => {
	// Define states and hooks
	const [login, { error }] = useMutation(LOGIN) // GraphQL mutation for user login
	const [isVisable, setIsVisable] = useState(false) // State to toggle password visibility

	// Function to toggle password visibility
	const toggleVisibility = () => setIsVisable(!isVisable)

	// Form validation and submission using react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({ mode: 'onBlur', resolver: zodResolver(loginSchema) })

	// Handle form submission
	const onSubmit = async (data) => {
		try {
			// Execute login mutation with user credentials
			const mutationResponse = await login({
				variables: { email: data.email, password: data.password }
			})
			// Extract token from mutation response and login user
			const token = mutationResponse.data.login.token
			Auth.login(token)
		} catch (e) {
			console.log(e) // Log any errors during login
		}
		reset() // Reset form after submission
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			backdrop='blur'
			placement='center'>
			<ModalContent>
				{() => (
					<>
						{/* Modal header */}
						<ModalHeader className='flex flex-col gap-1'>Login</ModalHeader>
						{/* Login form */}
						<form onSubmit={handleSubmit(onSubmit)}>
							{/* Modal body */}
							<ModalBody>
								{/* Input for email */}
								<Input
									size='lg'
									endContent={
										<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Email'
									labelPlacement='outside'
									placeholder='Enter your email'
									variant='bordered'
									isInvalid={errors.email?.message}
									errorMessage={errors.email?.message}
									{...register('email')}
								/>
								{/* Input for password */}
								<Input
									size='lg'
									endContent={
										<button
											className='focus:outline-none'
											type='button'
											onClick={toggleVisibility}>
											{isVisable ? (
												<EyeOffIcon className='text-2xl text-default-400 pointer-events-none' />
											) : (
												<EyeIcon className='text-2xl text-default-400 pointer-events-none' />
											)}
										</button>
									}
									label='Password'
									labelPlacement='outside'
									placeholder='Enter your password'
									type={isVisable ? 'text' : 'password'}
									variant='bordered'
									isInvalid={errors.password?.message}
									errorMessage={errors.password?.message}
									{...register('password')}
								/>
							</ModalBody>
							{/* Modal footer */}
							<ModalFooter className='flex flex-col'>
								{/* Display login error message if any */}
								{error ? (
									<p className='text-red-500 text-sm text-center'>
										{error.message}
									</p>
								) : null}
								{/* Links for signup and login buttons */}
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
