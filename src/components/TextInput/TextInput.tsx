import React from 'react'
import { Data, FormErrors } from '../../types'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Label from '../Label/Label'

type TextInputProps = {
	formErrors: FormErrors
	formData: Data
	handleInputChange: (name: string, value: string) => void
	inputName: keyof Data
	label: string
}

const TextInput: React.FC<TextInputProps> = ({ formErrors, formData, handleInputChange, inputName, label }) => {
	const value = formData[inputName]
	if (typeof value !== 'string') {
		console.error(`Invalid field type for TextInput: ${inputName}`)
		return null
	}
	return (
		<div>
			<Label inputName={inputName as string} label={label} />
			<input
				type='text'
				id={inputName as string}
				value={value}
				onChange={e => handleInputChange(inputName, e.target.value)}
				className={`w-full px-3 py-2 mt-1 border rounded focus:outline-none ${
					formErrors[inputName]
						? 'border-warning border-2 focus:ring-2 focus:ring-warning bg-backgroundError'
						: 'border-secondary focus:border-2 focus:border-accent'
				}`}
			/>
			{formErrors[inputName] && <ErrorMessage message={formErrors[inputName]} />}
		</div>
	)
}

export default TextInput
