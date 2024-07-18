import { Data, FormErrors } from './types'

export const validateForm = (formData: Data, setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>) => {
	let valid = true
	if (formData.name.trim() === '') {
		setFormErrors(prevErrors => ({
			...prevErrors,
			name: 'Please enter your first name.',
		}))
		return (valid = false)
	}
	if (formData.lastName.trim() === '') {
		setFormErrors(prevErrors => ({
			...prevErrors,
			lastName: 'Please enter your last name.',
		}))
		return (valid = false)
	}
	if (formData.email.trim() === '' || !formData.email.includes('@')) {
		setFormErrors(prevErrors => ({
			...prevErrors,
			email: 'Please use correct formatting. Example: address@email.com',
		}))
		return (valid = false)
	}

	if (!formData.photo) {
		setFormErrors(prevErrors => ({
			...prevErrors,
			photo: 'Please upload photo',
		}))
		return (valid = false)
	}

	if (formData.date.trim() === '') {
		setFormErrors(prevErrors => ({
			...prevErrors,
			date: 'Please pick date',
		}))
		return (valid = false)
	}
	if (formData.hour.trim() === '') {
		setFormErrors(prevErrors => ({
			...prevErrors,
			hour: 'Please pick hour',
		}))
		return (valid = false)
	}
	return valid
}
