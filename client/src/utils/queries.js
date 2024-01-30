import { gql } from '@apollo/client'

export const QUERY_SINGLE_USER = gql`
	query singleUser($_id: ID!) {
		user(_id: $_id) {
			_id
			firstName
			lastName
			icons {
				_id
				url
				prompt
			}
		}
	}
`
export const QUERY_ME = gql`
	query currentUser {
		me {
			_id
			firstName
			lastName
			credits
			icons {
				_id
				createdAt
				url
				prompt
				style
				color
			}
		}
	}
`
export const GET_USER_DATA = gql`
	query GetUser {
		user {
			id
			name
			email
		}
	}
`

export const QUERY_COMMUNITY_ICONS = gql`
	query communityIcons {
		communityIcons {
			_id
			createdAt
			prompt
			style
			color
			user {
				_id
				firstName
			}
			url
		}
	}
`
