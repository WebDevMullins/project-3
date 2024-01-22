import LoginForm from '@components/LoginForm'
import SignupForm from '@components/SignupForm'
import Auth from '@utils/auth'

import { Button, useDisclosure } from '@nextui-org/react'

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
			{/* Logout Button */}
			{Auth.loggedIn() ? (
				<Button
					onClick={Auth.logout}
					color='primary'>
					Log Out
				</Button>
			) : (
				<>
					{/* Signup and Login Buttons */}
					<div className='flex gap-2'>
						<Button
							onPress={openSignup}
							color='primary'>
							Sign Up
						</Button>
						<Button
							onClick={openLogin}
							color='primary'>
							Log In
						</Button>
					</div>

					{/* Signup Modal */}
					<SignupForm
						isOpen={signupOpen}
						onOpenChange={onSignupOpenChange}
						openLoginModal={openLoginModal}
					/>

					{/* Login Modal */}
					<LoginForm
						isOpen={loginOpen}
						onOpenChange={onLoginOpenChange}
						openSignupModal={openSignupModal}
					/>
				</>
			)}
		</>
	)
}

export default AuthForm
