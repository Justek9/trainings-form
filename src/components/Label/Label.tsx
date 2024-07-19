type LabelProps = {
	label: string
	inputName?: string
}

const Label: React.FC<LabelProps> = ({ label, inputName }) => {
	return (
		<label htmlFor={inputName} className='block text-base text-primary mt-3'>
			{label}
		</label>
	)
}

export default Label
