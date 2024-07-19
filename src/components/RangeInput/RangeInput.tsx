import { useEffect, useState } from 'react'
import { maxAge, minAge } from '../../utilsData'
import { Data } from '../../types'
import Label from '../Label/Label'

type RangeInputProps = {
	setFormData: React.Dispatch<React.SetStateAction<Data>>
	formData: Data
	label: string
}

const RangeInPut: React.FC<RangeInputProps> = ({ setFormData, formData, label }) => {
	const [tooltipValue, setTooltipValue] = useState<number | string>(formData.age)
	const [tooltipPosition, setTooltipPosition] = useState(0)

	const updateTooltipPosition = (value: number | string) => {
		const min = Number(minAge)
		const max = Number(maxAge)

		const newPosition = ((Number(value) - min) / (max - min)) * 100
		setTooltipPosition(newPosition)
	}

	useEffect(() => {
		updateTooltipPosition(formData.age)
	}, [formData.age])

	useEffect(() => {
		const rangeInput = document.querySelector('.custom-range') as HTMLInputElement
		if (rangeInput) {
			rangeInput.style.setProperty('--value', `${tooltipPosition}%`)
		}
	}, [tooltipPosition])

	return (
		<div className='relative'>
			<Label inputName='age' label={label} />
			<span className='text-xs text-primary absolute start-0'>8</span>
			<span className='text-xs text-primary absolute end-0'>100</span>

			<input
				type='range'
				id='age'
				name='age'
				min={minAge}
				max={maxAge}
				value={formData.age}
				onChange={e => {
					setFormData({ ...formData, age: e.target.value })
					setTooltipValue(e.target.value)
					updateTooltipPosition(e.target.value)
				}}
				className='custom-range w-full py-3 mt-2 focus:outline-none bg accent-accent focus-secondary bg-primary text-xs'
			/>
			<div
				className='absolute top-7 mt-8 transform -translate-x-1/2 border-b-secondary'
				style={{ left: `calc(${tooltipPosition}% + 8px)` }}>
				<div className='relative bg-white border border-secondary text-accent text-xs text-center font-medium rounded py-1 w-8'>
					{tooltipValue}
					<div className='absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-white border border-secondary border-r-0 border-b-0'></div>
				</div>
			</div>
		</div>
	)
}

export default RangeInPut
