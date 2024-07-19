import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import CustomDatePicker from '../DatePicker/CustomDatePicker'
import { Data, FormErrors } from '../../types'
import { URL_POST_FD, minAge, times } from '../../utilsData'
import { validateForm } from '../../helperfunctions'
import TextInput from '../TextInput/TextInput'
import RangeInPut from '../RangeInput/RangeInput'
import UploadPhoto from '../UploadPhoto/UploadPhoto'
import TimeSelection from '../TimeSelection/TimeSelection'
import Label from '../Label/Label'

const Form: React.FC = () => {
	const [formData, setFormData] = useState<Data>({
		name: '',
		lastName: '',
		email: '',
		age: minAge,
		photo: null,
		date: '',
		hour: '',
	})

	const [formErrors, setFormErrors] = useState<FormErrors>({
		name: '',
		lastName: '',
		email: '',
	})

	const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true)

	const isSendApplicationBtnDisabled = () => {
		const { name, lastName, email, age, photo, date, hour } = formData

		const allFilled =
			name &&
			lastName &&
			email &&
			age &&
			photo &&
			date &&
			hour &&
			!formErrors.name &&
			!formErrors.lastName &&
			!formErrors.email
		allFilled ? setIsSubmitBtnDisabled(false) : setIsSubmitBtnDisabled(true)
	}

	useEffect(() => {
		isSendApplicationBtnDisabled()
	}, [formData])

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const fd = new FormData()
		fd.append('name', formData.name)
		fd.append('lastName', formData.lastName)
		fd.append('email', formData.email)
		fd.append('age', formData.age)
		fd.append('photo', formData.photo!)
		fd.append('date', formData.date!)
		fd.append('hour', formData.hour)

		const options = {
			method: 'POST',
			body: fd,
		}

		fetch(URL_POST_FD, options)
			.then(res => {
				if (res.status === 200) {
					console.log('success')
				}
			})
			.catch(() => console.log('error'))
	}

	const handleInputChange = (fieldName: string, value: string) => {
		setFormData({ ...formData, [fieldName]: value })
		validateForm({ ...formData, [fieldName]: value }, setFormErrors)
	}

	return (
		<main className='flex items-center justify-center min-h-screen bg-backgroud'>
			<div className='w-full max-w-md p-8 space-y-6'>
				<form className='space-y-4' onSubmit={handleFormSubmit} noValidate>
					<Header text='Personal info' />
					<section>
						<TextInput
							formErrors={formErrors}
							formData={formData}
							handleInputChange={handleInputChange}
							inputName={'name'}
							label={'First name'}
						/>

						<TextInput
							formErrors={formErrors}
							formData={formData}
							handleInputChange={handleInputChange}
							inputName={'lastName'}
							label={'Last Name'}
						/>

						<TextInput
							formErrors={formErrors}
							formData={formData}
							handleInputChange={handleInputChange}
							inputName={'email'}
							label={'Email Address'}
						/>
						<RangeInPut formData={formData} setFormData={setFormData} label={'Age'} />
						<UploadPhoto label='Photo' formData={formData} setFormData={setFormData} />
					</section>

					<Header text='Your workout' />
					<section className='flex flex-col md:flex-row md:items-start gap-4'>
						<div className='flex-1'>
							<Label label='Date' />
							<CustomDatePicker setFormData={setFormData} formData={formData} />
						</div>
						{formData.date && <TimeSelection label='Time' formData={formData} setFormData={setFormData} />}
					</section>
					<div>
						<button
							type='submit'
							disabled={isSubmitBtnDisabled}
							className={`w-full px-4 py-2 text-white text-lg  rounded  focus:outline-none focus:primary ${
								isSubmitBtnDisabled ? 'bg-secondary' : 'bg-accent hover:bg-btnHover'
							}`}>
							Send Application
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}

export default Form
