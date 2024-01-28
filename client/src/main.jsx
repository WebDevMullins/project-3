import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home'
import Login from './pages/Login'
// import NoMatch from './pages/NoMatch'
import Cancel from './pages/Cancel'
import Checkout from './pages/Checkout'
import Generate from './pages/Generate'
import Signup from './pages/Signup'
import Success from './pages/Success'
import Team from './pages/Team.jsx'
<<<<<<< HEAD
import About from './pages/About.jsx'
=======
import Dashboard from './pages/Dashboard.jsx'
>>>>>>> f7154a02574d63867d201b740c90047905b77d6c

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
			{
				path: '/dashboard',
				element: <Dashboard />
			},
			{
				path: '/generate',
				element: <Generate />
			},
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
				element: <Team />
			},
			{
				path: '/about',
				element: <About />
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
)
