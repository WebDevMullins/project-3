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
			icons {
				_id
				url
				prompt
			}
		}
	}
`
