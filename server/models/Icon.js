const { Schema, model } = require('mongoose')

const iconSchema = new Schema({
	createdAt: {
		type: Schema.Types.Date,
		default: Date.now()
	},

	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	prompt: {
		type: String,
		required: true
	}
})

const Icon = model('Icon', iconSchema)

module.exports = Icon
