import React from 'react'
import { useNavigate } from 'react-router-dom'

const CancelPage = () => {
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
		backgroundColor: '#f2f2f2',
		color: '#333',
		fontFamily: 'Arial, sans-serif'
	}

	const buttonStyle = {
		marginTop: '20px',
		padding: '10px 20px',
		fontSize: '16px',
		color: '#fff',
		backgroundColor: '#007bff',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer'
	}

	return (
		<div style={pageStyle}>
			<h1>Order Canceled</h1>
			<p>Your order has been successfully canceled.</p>
			<button
				style={buttonStyle}
				onClick={handleReturnHome}>
				Return to Home
			</button>
		</div>
	)
}

export default CancelPage
