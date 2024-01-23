import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home'
import Login from './pages/Login'
// import NoMatch from './pages/NoMatch'
import Signup from './pages/Signup'
import Checkout from './pages/Checkout'
import Cancel from './pages/Cancel'
import Success from './pages/Success'
import Team from './pages/Team.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		// error: <NoMatch />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/signup',
				element: <Signup />
			},
			// {
			// 	path: '/generate',
			// 	element: <Generate />
			// },
			{
				path: '/checkout',
				element: <Checkout />
			},
			{
				path: '/cancel',
				element: <Cancel />
			},
			{
				path: '/success',
				element: <Success />
			},
			{
				path: '/team',
				element: <Team/>
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
)
