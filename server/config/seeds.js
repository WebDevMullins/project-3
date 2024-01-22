const db = require('./connection')
const { User } = require('../models')
const cleanDB = require('./cleanDB')

db.once('open', async () => {
	await cleanDB('User', 'users')

	await User.create({
		username: 'pamwham16',
		email: 'pamela@testmail.com',
		password: 'password12345'
	})

	await User.create({
		username: 'holtyourhorses26',
		email: 'eholt@testmail.com',
		password: 'password12345'
	})

	console.log('users seeded')

	process.exit()
})
