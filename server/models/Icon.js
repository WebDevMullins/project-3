const { Schema, model } = require('mongoose')

const iconSchema = new Schema({
	createdAt: {
		type: Schema.Types.Date,
		default: Date.now()
	},

	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'user'
	}
})

const Icon = model('Icon', iconSchema)

module.exports = Icon
