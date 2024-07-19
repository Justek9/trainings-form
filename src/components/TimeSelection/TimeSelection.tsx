import { Data } from '../../types'
import { times } from '../../utilsData'
import Label from '../Label/Label'

type TimeSelectionProps = {
	setFormData: React.Dispatch<React.SetStateAction<Data>>
	formData: Data
	label: string
}

const TimeSelection: React.FC<TimeSelectionProps> = ({ formData, setFormData, label }) => {
	const handleTimeClick = (time: string) => {
		setFormData({ ...formData, hour: time })
	}

	return (
		<div className='flex-1'>
			<Label label={label} />
			{times.map((time, i) => (
				<button
					key={i}
					type='button'
					onClick={() => handleTimeClick(time)}
					className={`rounded border m-1 border-secondary inline text-primary focus-primary bg-white hover:border-accent h-12 w-20 ${
						formData.hour === time ? 'ring-1 ring-accent' : ''
					}`}>
					{time}
				</button>
			))}
		</div>
	)
}

export default TimeSelection
