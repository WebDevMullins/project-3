const db = require('./connection')
const { User } = require('../models')
const cleanDB = require('./cleanDB')

db.once('open', async () => {
	await cleanDB('User', 'users')

	await User.create({
		firstName: 'Evan',
		lastName: 'Holt',
		email: 'eholt@mail.com',
		password: 'password12345',
		credits: 0
	})

	await User.create({
		firstName: 'Steve',
		lastName: 'Jobs',
		email: 'sjobs@mail.com',
		password: 'password12345',
		credits: 0
	})

	await User.create({
		firstName: 'Test',
		lastName: 'Test',
		email: 'test@test.com',
		password: 'asdfasdf',
		credits: 0
	})

	console.log('users seeded')

	process.exit()
})
