import { Data, FormErrors } from './types'

const containsNumbers = (str: string) => {
	const regex = /\d/
	return regex.test(str)
}

const isValidEmail = (email: string) => {
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	return regex.test(email)
}
export const validateForm = (formData: Data, setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>) => {
	const errors = {
		name: '',
		lastName: '',
		email: '',
	}

	if (containsNumbers(formData.name)) {
		errors.name = 'Name can not contain numbers'
	}
	if (containsNumbers(formData.lastName)) {
		errors.lastName = 'Last name can not contain numbers'
	}

	if (formData.email && !isValidEmail(formData.email)) {
		errors.email = 'Please use correct formatting. <br /> Example: address@email.com'
	}

	setFormErrors({ ...errors })

	let isValid = true
	for (let val in Object.values(errors)) {
		if (val.length > 0) isValid = false
	}

	return isValid
}
