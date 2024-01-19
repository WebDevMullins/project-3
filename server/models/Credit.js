const mongoose = require('mongoose')

const creditSchema = new mongoose.Schema({
	userId: String,
	credits: Number
})

const Credit = mongoose.model('Credit', creditSchema)

module.exports = Credit
