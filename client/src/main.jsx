import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home'
import Login from './pages/Login'
// import NoMatch from './pages/NoMatch'
import Signup from './pages/Signup'

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
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
)
