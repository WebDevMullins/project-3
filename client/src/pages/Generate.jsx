import { count, presetColors, styles } from '@/utils/data'
import { generateSchema } from '@/utils/validation'
import { ColorPicker } from '@components/ColorPicker'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'

const Generate = () => {
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

	const onSubmit = async (data) => {
		console.log(data)
		reset()
	}

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
									key={count}
									value={count}
									textValue={`${count}`}>
									{count}
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
			</section>
		</>
	)
}

export default Generate
