const db = require('./connection')
const { User, Icon } = require('../models')
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

	await cleanDB('Icon', 'icons')

	const users = await User.find({})

	await Icon.create({
		userId: users[0]._id,
		prompt: 'prompt1'
	})

	await Icon.create({
		userId: users[1]._id,
		prompt: 'prompt2'
	})

	await Icon.create({
		userId: users[2]._id,
		prompt: 'prompt3'
	})

	console.log('icons seeded')

	process.exit()
})
