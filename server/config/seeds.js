const db = require('./connection')
const { User } = require('../models')
const cleanDB = require('./cleanDB')

db.once('open', async () => {
	await cleanDB('Category', 'categories')
	await cleanDB('Product', 'products')
	await cleanDB('User', 'users')

	await User.create({
		firstName: 'Pamela',
		lastName: 'Washington',
		email: 'pamela@testmail.com',
		password: 'password12345'
	})

	await User.create({
		firstName: 'Elijah',
		lastName: 'Holt',
		email: 'eholt@testmail.com',
		password: 'password12345'
	})

	console.log('users seeded')

	process.exit()
})
