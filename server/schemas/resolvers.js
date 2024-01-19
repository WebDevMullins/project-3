const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
	Query: {
		users: async () => {
			return await User.find({})
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
		}
	}
}

module.exports = resolvers
