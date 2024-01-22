import { zodResolver } from '@hookform/resolvers/zod'
import { Button, useDisclosure } from '@nextui-org/react'
import { useForm } from 'react-hook-form'

import LoginForm from '../LoginForm'
import SignupForm from '../SignupForm'

import { loginSchema, signupSchema } from '../../utils/validation'

const AuthForm = () => {
	// Hooks for controlling the visibility of Signup and Login modals
	const {
		isOpen: signupOpen,
		onOpen: openSignup,
		onOpenChange: onSignupOpenChange
	} = useDisclosure()

	const {
		isOpen: loginOpen,
		onOpen: openLogin,
		onOpenChange: onLoginOpenChange
	} = useDisclosure()

	// Function to open Signup modal and close Login modal
	const openSignupModal = () => {
		onLoginOpenChange(false)
		openSignup()
	}

	// Function to open Login modal and close Signup modal
	const openLoginModal = () => {
		onSignupOpenChange(false)
		openLogin()
	}

	const signupForm = useForm({
		mode: 'onBlur',
		resolver: zodResolver(signupSchema)
	})

	const loginForm = useForm({
		mode: 'onBlur',
		resolver: zodResolver(loginSchema)
	})
	// const [formData, setFormData] = useState(null)

	const onSubmitSignup = async (data) => {
		// setFormData(formData)
		console.log('Signup data:', data)
		console.log('signup errors:', signupForm.errors)
		signupForm.reset()
	}

	const onSubmitLogin = async (data) => {
		// setFormData(formData)
		console.log('Login data:', data)
		console.log('login errors:', loginForm.errors)
		loginForm.reset()
	}

	return (
		<>
			{/* Signup Button */}
			<Button
				onPress={openSignup}
				color='primary'>
				Sign Up
			</Button>

			{/* Signup Modal */}
			<SignupForm
				isOpen={signupOpen}
				onOpenChange={onSignupOpenChange}
				openLoginModal={openLoginModal}
				register={signupForm.register}
				handleSubmit={signupForm.handleSubmit}
				errors={signupForm.errors}
				onSubmit={onSubmitSignup}
			/>

			{/* Login Button */}
			<Button
				onClick={openLogin}
				color='primary'>
				Log In
			</Button>

			{/* Login Modal */}
			<LoginForm
				isOpen={loginOpen}
				onOpenChange={onLoginOpenChange}
				openSignupModal={openSignupModal}
				register={loginForm.register}
				handleSubmit={loginForm.handleSubmit}
				errors={loginForm.errors}
				onSubmit={onSubmitLogin}
			/>
		</>
	)
}

export default AuthForm
