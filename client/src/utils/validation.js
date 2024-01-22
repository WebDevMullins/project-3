import { z } from 'zod'

const signupSchema = z.object({
	firstName: z
		.string()
		.min(2, 'First name must be at least 2 characters')
		.max(20, 'First name must be less than 20 characters'),
	lastName: z
		.string()
		.min(2, 'Last name must be at least 2 characters')
		.max(20, 'Last name must be less than 20 characters'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters')
})

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters')
})

export { loginSchema, signupSchema }
