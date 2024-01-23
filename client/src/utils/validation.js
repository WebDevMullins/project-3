import { styles } from '@/utils/data'
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
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(20, 'Password must be no more than 20 characters')
})

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password is required')
})

const generateSchema = z.object({
	prompt: z.string().min(1, 'Prompt is required'),
	color: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i, 'Invalid color'),
	style: z
		.string()
		.refine((style) => styles.includes(style), {
			message: 'Invalid style selected'
		}),
	count: z.string().regex(/^[1-5]$/, 'Invalid count')
})

export { generateSchema, loginSchema, signupSchema }
