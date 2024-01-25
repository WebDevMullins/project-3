import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { count, presetColors, styles } from '@/utils/data'
import { generateSchema } from '@/utils/validation'
import { ColorPicker } from '@components/ColorPicker'
import {
	Button,
	Input,
	Select,
	SelectItem,
	useDisclosure
} from '@nextui-org/react'
import { CREATE_ICON } from '@utils/mutations'
import DashboardIconCard from '../components/DashboardIconCard'
import GenerateIconModal from '../components/GenerateIconModal'

const Generate = () => {
	const [createIcon, { error }] = useMutation(CREATE_ICON)
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
			console.log('Submitting form with input:', input)

			const response = await createIcon({
				variables: {
					input: {
						...input
					}
				}
			})

			const icons = response.data?.createIcon || []

			const url = icons.map((icon) => icon.url)

			setIconUrl(url)
			setPrompt(input.prompt)
			console.log('URL:', url)
			onOpen(isSubmitSuccessful)
			reset()
		} catch (err) {
			console.error('Error creating icon', err.message)
		}
	}

	useEffect(() => {
		// Open the modal automatically when there are icons to display
		if (iconUrl.length > 0) {
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
							Enter your prompt, choose a style, and select a base color
						</p>
					</div>
					<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
				<DashboardIconCard />
				<DashboardIconCard />
			</div>
					<form
						className='flex flex-col gap-8'
						onSubmit={handleSubmit(onSubmit)}>
						<Input
							type='text'
							label='Prompt'
							placeholder='adjective noun'
							variant='bordered'
							isInvalid={errors.prompt?.message}
							errorMessage={errors.prompt?.message}
							{...register('prompt')}
						/>
						<div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
							<Select
								variant='bordered'
								label='Select a style'
								className='max-w-xs'
								isInvalid={errors.style?.message}
								errorMessage={errors.style?.message}
								{...register('style')}>
								{styles.map((style) => (
									<SelectItem
										key={style}
										value={style}>
										{style}
									</SelectItem>
								))}
							</Select>
						</div>
						<div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
							<Select
								variant='bordered'
								label='Select number to generate'
								className='max-w-xs'
								isInvalid={errors.count?.message}
								errorMessage={errors.count?.message}
								{...register('count')}>
								{count.map((count) => (
									<SelectItem
										key={count.value}
										value={count.value}>
										{count.label}
									</SelectItem>
								))}
							</Select>
						</div>
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

						<Button
							color='primary'
							type='submit'
							isLoading={isSubmitting}>
							Generate
						</Button>
					</form>
					{error && <p>Error: {error.message}</p>}
				</div>
			</section>
			{iconUrl.length > 0 && (
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
