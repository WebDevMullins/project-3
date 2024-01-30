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
						key={presetColor.hex}
						className='picker__swatch'
						type='button'
						title={presetColor.name}
						style={{ background: presetColor.hex }}
						onClick={() => onChange(presetColor.hex)}
					/>
				))}
			</div>
		</div>
	)
}
