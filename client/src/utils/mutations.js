import { gql } from '@apollo/client'

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`
export const ADD_USER = gql`
	mutation addUser(
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
	) {
		addUser(
			firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
		) {
			token
			user {
				_id
			}
		}
	}
`
export const CREATE_ICON = gql`
	mutation createIcon($input: CreateIconInput!) {
		createIcon(input: $input) {
			url
		}
	}
`
export const CREATE_CHECKOUT_SESSION = gql`
	mutation createCheckoutSession($token: String!) {
		createCheckoutSession(token: $token) {
			sessionId
		}
	}
`

export const DELETE_ICON = gql`
	mutation deleteIcon($_id: ID!) {
		deleteIcon(_id: $_id) {
			_id
			icons {
				_id
				prompt
				url
			}
		}
	}
`
