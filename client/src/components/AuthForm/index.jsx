import { Button, useDisclosure } from '@nextui-org/react'

import LoginForm from '@components/LoginForm'
import SignupForm from '@components/SignupForm'

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
			/>
		</>
	)
}

export default AuthForm
