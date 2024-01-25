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
import GenerateIconModal from '../components/GenerateIconModal'

const Generate = () => {
	const [createIcon, { loading, error }] = useMutation(CREATE_ICON)
	const [iconUrl, setIconUrl] = useState([])
	const [prompt, setPrompt] = useState([])
	const { isOpen, onOpen, onClose } = useDisclosure()

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
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
			onOpen()
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
			<section className='flex max-w-screen-md w-full mx-auto min-h-screen justify-center items-center'>
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
					<Button
						color='primary'
						type='submit'>
						Generate
					</Button>
				</form>
				{loading && <p>Loading...</p>}
				{error && <p>Error: {error.message}</p>}
			</section>
			{iconUrl.length > 0 && (
				<GenerateIconModal
					isOpen={isOpen}
					onClose={onClose}
					iconUrl={iconUrl}
					prompt={prompt}
				/>
			)}
		</>
	)
}

export default Generate
