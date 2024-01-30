import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Auth from '@/utils/auth'
import { presetColors, styles } from '@/utils/data'
import { generateSchema } from '@/utils/validation'
import { ColorPicker } from '@components/ColorPicker'
import GenerateIconModal from '@components/GenerateIconModal'
import {
	Button,
	Input,
	Select,
	SelectItem,
	useDisclosure
} from '@nextui-org/react'
import { CREATE_ICON } from '@utils/mutations'
import { QUERY_ME } from '@utils/queries'
import ErrorModal from '../components/ErrorModal'

const Generate = () => {
	// Define state and hooks
	const [createIcon, { error }] = useMutation(CREATE_ICON, {
		// Mutation hook for creating icons
		refetchQueries: [{ query: QUERY_ME }] // Refetching user data after mutation
	})
	const [iconUrl, setIconUrl] = useState([]) // State for storing generated icon URLs
	const [prompt, setPrompt] = useState([]) // State for storing user prompts
	const { isOpen, onOpen } = useDisclosure() // Disclosure hook for managing modal visibility

	// Define form management hook
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset
	} = useForm({
		mode: 'onBlur', // Form validation mode
		resolver: zodResolver(generateSchema) // Using Zod schema for form validation
	})

	// Define form submission handler
	const onSubmit = async (input) => {
		try {
			const style = styles.find((s) => s.name === input.style) // Find selected style

			// Execute GraphQL mutation to create icon
			const response = await createIcon({
				variables: {
					input: {
						prompt: input.prompt,
						color: input.color
					},
					style: {
						name: style.name,
						value: style.value
					}
				}
			})

			const icons = response.data?.createIcon || [] // Extract created icons from response
			const url = icons.map((icon) => icon.url) // Extract icon URLs

			setIconUrl(url) // Set generated icon URLs
			setPrompt(input.prompt) // Set user prompt
			onOpen(isSubmitSuccessful) // Open modal if submission is successful
			reset() // Reset form
		} catch (err) {
			console.error('Error creating icon', err.message) // Log error if icon creation fails
		}
	}

	// Effect hook to open modal when icons are available
	useEffect(() => {
		if (iconUrl.length) {
			onOpen() // Open modal
		}
	}, [iconUrl, onOpen])

	// Render component
	return (
		<>
			<section className='flex flex-row justify-center md:px-24 mx-auto my-16 bg-neutral-700/25 backdrop-blur-xs rounded '>
				<div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
					<div className='mx-auto mb-8 max-w-screen-sm lg:mb-16'>
						<h2 className='mb-4 text-4xl tracking-tight font-extrabold text-white'>
							Generate Icon
						</h2>
						<p className='mb-4 font-light text-gray-400 sm:text-xl'>
							Enter your <span className='text-primary'>prompt</span>, choose a{' '}
							<span className='text-primary'>style</span>, and select a base{' '}
							<span className='text-primary'>color</span>
						</p>
						<p className='font-light text-gray-400'>
							Each generation costs 10 Credits
						</p>
					</div>
					<div className='flex flex-col max-w-screen-sm items-center'>
						<form
							className='flex flex-col w-full gap-8'
							onSubmit={handleSubmit(onSubmit)}>
							{/* Prompt */}
							<div className='flex flex-wrap md:flex-nowrap gap-4'>
								<Input
									type='text'
									label='Prompt'
									labelPlacement='outside'
									placeholder='grouchy granny'
									variant='bordered'
									size='lg'
									isInvalid={errors.prompt?.message}
									errorMessage={errors.prompt?.message}
									{...register('prompt')}
								/>
							</div>
							{/* Style */}
							<div className='flex flex-wrap md:flex-nowrap gap-4'>
								<Select
									variant='bordered'
									label='Style'
									labelPlacement='outside'
									placeholder='Select a style'
									size='lg'
									isInvalid={errors.style?.message}
									errorMessage={errors.style?.message}
									{...register('style')}>
									{styles.map((style) => (
										<SelectItem
											key={style.name}
											value={{ name: style.name, value: style.value }}
											className='capitalize'>
											{style.name}
										</SelectItem>
									))}
								</Select>
							</div>
							{/* Color */}
							<div className='flex flex-wrap justify-center md:flex-nowrap gap-4'>
								<Controller
									name='color'
									control={control}
									render={({ field: { onChange, value } }) => (
										<ColorPicker
											color={value}
											onChange={onChange}
											presetColors={presetColors}
										/>
									)}
								/>
							</div>
							{Auth.loggedIn() ? (
								<Button
									color='primary'
									type='submit'
									isLoading={isSubmitting}>
									Generate
								</Button>
							) : (
								<Button
									color='default'
									disabled>
									Please login to Generate
								</Button>
							)}
						</form>
					</div>
					{error && (
						<ErrorModal
							isOpen={error} // Display error modal if there's an error
							error={error}
						/>
					)}
				</div>
			</section>
			{iconUrl && (
				<GenerateIconModal
					isOpen={isOpen} // Display icon modal if there are generated icons
					iconUrl={iconUrl}
					prompt={prompt}
				/>
			)}
		</>
	)
}

export default Generate
