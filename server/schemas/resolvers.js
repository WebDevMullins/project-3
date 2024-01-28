const jwt = require('jsonwebtoken')
const OpenAI = require('openai')
const {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand
} = require('@aws-sdk/client-s3')
const { User, Icon } = require('../models')

const dotenv = require('dotenv')
dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const SUCCESS_URL = process.env.SUCCESS_URL
const CANCEL_URL = process.env.CANCEL_URL
const secret = 'mysecretssshhhhhhh'

const { signToken, AuthenticationError } = require('../utils/auth')
const mockImage = require('../utils/mockImage')
const { generateObjectUrl } = require('../utils/s3')

const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey
	},
	region: bucketRegion
})

// this function will convert image from s3 to base64 string
function encode(img) {
	let buf = Buffer.from(img)
	let base64 = buf.toString('base64')
	return base64
}

async function generateIcon(prompt, count) {
	const parsedCount = parseInt(count)

	if (process.env.MOCK_OPENAI_API === 'true') {
		console.log(
			'\n---==========================---',
			'\n---=== Mocking OpenAI API ===---',
			'\n---==========================---\n'
		)

		return Array.from({ length: 1 }, () => mockImage)
	} else {
		try {
			const response = await openai.images.generate({
				model: 'dall-e-2',
				prompt,
				response_format: 'b64_json',
				size: '512x512'
			})

			return response.data.map((result) => result.b64_json ?? '')
		} catch (error) {
			throw new Error(error.message)
		}
	}
}
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
		},
		me: async (parent, args, context) => {
			if (context.user) {
				const me = await User.findById(context.user._id)
					.populate({
						path: 'icons',
						options: { sort: { createdAt: -1 } }
					})
				const iconUrlArray = me.icons.map((icon) => {
					return {
						...icon._doc,
						url: generateObjectUrl(icon._id)
					}
				})
				return {
					...me._doc,
					icons: iconUrlArray
				}
			}
		},
		communityIcons: async () => {
			const icons = await Icon.find().sort({ createdAt: -1 }).limit(24)
			const iconUrlArray = icons.map((icon) => {
				return {
					...icon._doc,
					url: generateObjectUrl(icon._id)
				}
			})
			return iconUrlArray
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

		createCheckoutSession: async (_, { token }) => {
			try {
				const decoded = jwt.verify(token, secret)
				const userId = decoded.data._id

				const user = await User.findById(userId)
				if (!user) {
					throw new Error('User not found')
				}

				const session = await stripe.checkout.sessions.create({
					payment_method_types: ['card'],
					line_items: [
						{
							price_data: {
								currency: 'usd',
								product_data: {
									name: 'Credits'
								},
								unit_amount: 1000
							},
							quantity: 1
						}
					],
					mode: 'payment',
					success_url: SUCCESS_URL,
					cancel_url: CANCEL_URL,
					metadata: {
						userId: user._id.toString()
					}
				})
				return { sessionId: session.id }
			} catch (error) {
				throw new Error(error.message)
			}
		},

		createIcon: async (parent, { input }, context) => {
			try {
				const finalPrompt = `a modern icon of ${input.prompt}, with a color of ${input.color}, in a ${input.style} style, minimalistic, high quality, trending on art station, unreal engine 5 graphics quality`

				const b64Icons = await generateIcon(finalPrompt)
				const createdIcons = await Promise.all(
					b64Icons.map(async (image) => {
						const icon = await Icon.create({
							prompt: input.prompt,
							userId: context.user._id
						})

						await User.findOneAndUpdate(
							{ _id: context.user._id },
							{ $push: { icons: icon._id } },
							{ new: true }
						)

						await s3.send(
							new PutObjectCommand({
								Bucket: `${bucketName}`,
								Body: Buffer.from(image, 'base64'),
								Key: icon.id,
								ContentEncoding: 'base64',
								ContentType: 'image/jpeg'
							})
						)

						return icon
					})
				)

				return createdIcons.map(async (icon) => {
					const data = await s3.send(
						new GetObjectCommand({
							Bucket: bucketName,
							Key: icon.id
						})
					)

					const imageArray = await data.Body.transformToByteArray()
					const imageSrc = 'data:image/png;base64,' + encode(imageArray)

					return {
						// this was the single line before
						// url: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${icon.id}`
						url: imageSrc
					}
				})
			} catch (error) {
				console.error('Error creating icon', error)
				throw new Error(error.message)
			}
		},
		deleteIcon: async (parent, { _id }, context) => {
			try {
				const icon = await Icon.findById(_id)

				if (!icon) {
					throw new Error('Icon not found')
				}

				if (icon.userId.toString() !== context.user._id.toString()) {
					throw new Error('You are not authorized to delete this icon')
				}

				await s3.send(
					new DeleteObjectCommand({
						Bucket: bucketName,
						Key: icon.id
					})
				)

				await Icon.findByIdAndDelete(_id)

				return await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { icons: _id } },
					{ new: true }
				)

				// return {
				// 	message: 'Icon deleted successfully'
				// }
			} catch (error) {
				console.error('Error deleting icon', error)
				throw new Error(error.message)
			}
		}
	}
}

module.exports = resolvers
