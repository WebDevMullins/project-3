import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Auth from '@utils/auth'
import { ADD_USER } from '@utils/mutations'
import { signupSchema } from '@utils/validation'

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
import { EyeIcon, EyeOffIcon, MailIcon } from 'lucide-react'

const SignupForm = ({ isOpen, onOpenChange, openLoginModal }) => {
	// Define states and hooks
	const [addUser, { error }] = useMutation(ADD_USER) // GraphQL mutation for adding a new user
	const [email, setEmail] = useState('') // State to store email for error message display
	const [isVisable, setIsVisable] = useState(false) // State to toggle password visibility

	// Function to toggle password visibility
	const toggleVisibility = () => setIsVisable(!isVisable)

	// Form validation and submission using react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({ mode: 'onBlur', resolver: zodResolver(signupSchema) })

	// Handle form submission
	const onSubmit = async (data) => {
		setEmail(data.email) // Store email for error message display
		const mutationResponse = await addUser({
			variables: {
				email: data.email,
				password: data.password,
				firstName: data.firstName,
				lastName: data.lastName
			}
		})
		const token = mutationResponse.data.addUser.token // Extract token from mutation response
		Auth.login(token) // Log in user with extracted token
		reset() // Reset form after submission
	}

	return (
		// Modal component for signup form
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			backdrop='blur'
			placement='center'>
			<ModalContent>
				{() => (
					<>
						{/* Modal header */}
						<ModalHeader className='flex flex-col gap-1'>Signup</ModalHeader>
						{/* Signup form */}
						<form onSubmit={handleSubmit(onSubmit)}>
							{/* Modal body */}
							<ModalBody>
								<div className='flex gap-2'>
									{/* Inputs for first name and last name */}
									<Input
										size='lg'
										autoFocus
										type='text'
										label='First Name'
										labelPlacement='outside'
										placeholder='Enter your first name'
										variant='bordered'
										isInvalid={errors.firstName?.message}
										errorMessage={errors.firstName?.message}
										{...register('firstName')}
									/>
									<Input
										size='lg'
										type='text'
										label='Last Name'
										labelPlacement='outside'
										placeholder='Enter your last name'
										variant='bordered'
										isInvalid={errors.lastName?.message}
										errorMessage={errors.lastName?.message}
										{...register('lastName')}
									/>
								</div>
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
								{/* Display signup error message if email is already in use */}
								{error &&
								error.message ===
									`E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "${email}" }` ? (
									<p className='text-red-500 text-sm text-center'>
										Email already in use.
									</p>
								) : null}
								<div className='flex justify-between'>
									{/* Links for login and signup buttons */}
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
								</div>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default SignupForm
