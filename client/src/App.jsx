import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink
} from '@apollo/client'
import React, { useState, useEffect } from 'react'
import './App.css'

import { setContext } from '@apollo/client/link/context'
import { NextUIProvider } from '@nextui-org/react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import Layout from '@components/Layout'
import Nav from '@components/Nav'
import StarsCanvas from '@components/StarBackground'

const httpLink = createHttpLink({
	uri: '/graphql'
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache()
})

function App() {
	const navigate = useNavigate()

	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<NextUIProvider navigate={navigate}>
					<StarsCanvas />
					<Nav />
					<Layout>
						<Outlet />
					</Layout>
				</NextUIProvider>
			</Provider>
		</ApolloProvider>
	)
}

export default App
