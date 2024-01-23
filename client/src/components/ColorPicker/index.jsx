import { HexColorPicker } from 'react-colorful'

export const ColorPicker = ({ color, onChange, presetColors }) => {
	return (
		<div className='picker'>
			<HexColorPicker
				color={color}
				onChange={onChange}
			/>

			<div className='picker__swatches'>
				{presetColors.map((presetColor) => (
					<button
						key={presetColor}
						className='picker__swatch'
						type='button'
						style={{ background: presetColor }}
						onClick={() => onChange(presetColor)}
					/>
				))}
			</div>
		</div>
	)
}
