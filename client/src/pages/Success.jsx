import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {
	const navigate = useNavigate()

	const handleReturnHome = () => {
		navigate('/') // Redirect to home page
	}

	const pageStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		textAlign: 'center',
		// Light green background for success
		backgroundColor: '#e8f5e9',
		color: '#333',
		fontFamily: 'Arial, sans-serif'
	}

	const buttonStyle = {
		marginTop: '20px',
		padding: '10px 20px',
		fontSize: '16px',
		color: '#fff',
		// Green button for success
		backgroundColor: '#4caf50',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer'
	}

	return (
		<div style={pageStyle}>
			<h1>Order Successful</h1>
			<p>Your order has been placed successfully.</p>
			<button
				style={buttonStyle}
				onClick={handleReturnHome}>
				Return to Home
			</button>
		</div>
	)
}

export default SuccessPage
