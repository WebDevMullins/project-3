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

const Generate = () => {
	const [createIcon, { error }] = useMutation(CREATE_ICON, {
		refetchQueries: [{ query: QUERY_ME }]
	})
	const [iconUrl, setIconUrl] = useState([])
	const [prompt, setPrompt] = useState([])
	const { isOpen, onOpen } = useDisclosure()

	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset
	} = useForm({
		mode: 'onBlur',
		resolver: zodResolver(generateSchema)
	})

	const onSubmit = async (input) => {
		try {
			const style = styles.find((s) => s.name === input.style)

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

			const icons = response.data?.createIcon || []

			const url = icons.map((icon) => icon.url)

			setIconUrl(url)
			setPrompt(input.prompt)
			onOpen(isSubmitSuccessful)
			reset()
		} catch (err) {
			console.error('Error creating icon', err.message)
		}
	}

	useEffect(() => {
		// Open the modal automatically when there are icons to display
		if (iconUrl.length) {
			onOpen()
		}
	}, [iconUrl, onOpen])

	return (
		<>
			<section className='flex flex-row justify-center w-full mx-auto my-16 bg-neutral-700/25 backdrop-blur-xs rounded '>
				<div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6'>
					<div className='mx-auto mb-8 max-w-screen-sm lg:mb-16'>
						<h2 className='mb-4 text-4xl tracking-tight font-extrabold text-white'>
							Generate Icon
						</h2>
						<p className='font-light text-gray-500 sm:text-xl dark:text-gray-400'>
							Enter your <span className='text-primary'>prompt</span>, choose a{' '}
							<span className='text-primary'>style</span>, and select a base{' '}
							<span className='text-primary'>color</span>
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
					{error && <p>Error: {error.message}</p>}
				</div>
			</section>
			{iconUrl && (
				<GenerateIconModal
					isOpen={isOpen}
					iconUrl={iconUrl}
					prompt={prompt}
				/>
			)}
		</>
	)
}

export default Generate
