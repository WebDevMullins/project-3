const { User, Icon } = require('../models')
const { generateObjectUrl } = require('../utils/s3')
const { signToken, AuthenticationError } = require('../utils/auth')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { generateImage } = require('../utils/helpers')

const resolvers = {
	Query: {
		user: async (_, { _id }) => {
			const user = await User.findById(_id).populate('icons')
			const iconUrlArray = user.icons.map((icon) => {
				return {
					...icon._doc, // when spreading object, it has too properties. only need _doc property which has the actual information we want
					url: generateObjectUrl(icon._id)
				}
			})
			return {
				...user._doc, // when spreading object, it has too properties. only need _doc property which has the actual information we want
				icons: iconUrlArray
			}
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
		},
		createCheckoutSession: async (_, { lineItems }) => {
			try {
				const session = await stripe.checkout.sessions.create({
					line_items: lineItems,
					mode: 'payment',
					success_url: `http://localhost:3000/success`,
					cancel_url: `http://localhost:3000/cancel`
				})

				return {
					id: session.id,
					url: session.url
				}
			} catch (error) {
				throw new Error(error.message)
			}
		},
		createIcon: async (parent, args) => {
			try {
				const image_urls = generateImage(args)
				console.log(image_urls)
				return image_urls
			} catch (error) {
				throw new Error(error.message)
			}
		}
	}
}

module.exports = resolvers
