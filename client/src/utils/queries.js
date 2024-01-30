import { gql } from '@apollo/client'

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
