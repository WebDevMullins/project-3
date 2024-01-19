const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
	Query: {
		user: async (_, { _id }) => {
			return await User.findById(_id)
		}
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create(args)
			const token = signToken(user)

			return { token, user }
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email })

			if (!user) {
				throw AuthenticationError
			}

			const correctPw = await user.isCorrectPassword(password)

			if (!correctPw) {
				throw AuthenticationError
			}

			const token = signToken(user)

			return { token, user }
		},
		updateCredits: async (_, { _id, credits }) => {
			const user = await User.findByIdAndUpdate(_id, { credits }, { new: true })
			if (!user) {
				throw new Error('User not found')
			}
			// If statement to ensure no negative creidts
			if (credits < 0) {
				throw new Error('Invalid credit amount')
			}
			return user
		}
	}
}

module.exports = resolvers
