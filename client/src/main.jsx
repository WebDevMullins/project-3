import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home'
import Login from './pages/Login'
// import NoMatch from './pages/NoMatch'
import Cancel from './pages/Cancel'
import Generate from './pages/Generate'
import Signup from './pages/Signup'
import Success from './pages/Success'
import Team from './pages/Team.jsx'
import About from './pages/About.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Community from './pages/Community.jsx'
import Pricing from './pages/Pricing.jsx'

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
				path: '/pricing',
				element: <Pricing />
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
<<<<<<< HEAD
				element: <Team />
=======
				element: <Team/>
			},
			{
				path: '/community',
				element: <Community/>
>>>>>>> cc8d4d0a572803a07b2f35e4e0532cc34bba50e1
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
)
