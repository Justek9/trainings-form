import React, { ChangeEvent, useEffect, useState } from 'react'
import Header from '../Header/Header'
import CustomDatePicker from '../DatePicker/CustomDatePicker'

type FormData = {
	name: string
	lastName: string
	email: string
	age: string | number
	photo: File | null
	date: string
	hour: string
}

const Form: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		lastName: '',
		email: '',
		age: '8',
		photo: null,
		date: '2024-07-17',
		hour: '',
	})

	const [formErrors, setFormErrors] = useState({
		name: '',
		lastName: '',
		email: '',
		age: '',
		photo: null,
		date: '',
		hour: '',
	})

	const [holiday, setHolidays] = useState(null)

	const getHolidays = () => {
		const country = 'PL'
		const year = '2024'
		const API_KEY = '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx'

		const options = {
			method: 'GET',
			headers: {
				'X-Api-Key': API_KEY,
			},
		}

		fetch(`https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}`, options)
			.then(res => res.json())
			.then(data => setHolidays(data))
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getHolidays()
	}, [])

	const [tooltipValue, setTooltipValue] = useState<number | string>(formData.age)
	const [tooltipPosition, setTooltipPosition] = useState(0)

	useEffect(() => {
		const rangeInput = document.querySelector('.custom-range') as HTMLInputElement
		if (rangeInput) {
			rangeInput.style.setProperty('--value', `${tooltipPosition}%`)
		}
	}, [tooltipPosition])

	useEffect(() => {
		updateTooltipPosition(formData.age)
	}, [formData.age])

	const updateTooltipPosition = (value: number | string) => {
		const min = 8
		const max = 100
		const newPosition = ((Number(value) - min) / (max - min)) * 100
		console.log(newPosition)
		setTooltipPosition(newPosition)
	}
	const validateForm = () => {
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
		return valid
	}

	const times = ['12:00', '14:00', '16:30', '18:30', '20:00']
	const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false)

	const isSendApplicationBtnDisabled = () => {
		const { name, lastName, email, age, photo, date, hour } = formData
		const allFilled = name && lastName && email && age && photo && date && hour
		allFilled ? setIsSubmitBtnDisabled(false) : setIsSubmitBtnDisabled(true)
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			setFormData({ ...formData, photo: file })
		} else {
			setFormData({ ...formData, photo: null })
		}
		isSendApplicationBtnDisabled()
	}

	const handleTimeClick = (time: string) => {
		setFormData({ ...formData, hour: time })
	}

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// TO DO:add logic

		console.log('Form submitted')
		validateForm()
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			setFormData({ ...formData, photo: event.dataTransfer.files[0] })
		}
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
	}

	useEffect(() => {
		// isSendApplicationBtnDisabled()
		// validateForm()
	}, [formData])

	return (
		<section className='flex items-center justify-center min-h-screen bg-backgroud'>
			<div className='w-full max-w-md p-8 space-y-6'>
				<Header text='Personal info' />
				<form className='space-y-4' onSubmit={handleFormSubmit} noValidate>
					<div>
						<label htmlFor='name' className='block text-sm text-primary'>
							First Name
						</label>
						<input
							type='text'
							id='name'
							value={formData.name}
							onChange={e => setFormData({ ...formData, name: e.target.value })}
							className={`w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:border-2  ${
								formErrors.name
									? 'border-warning border-2 focus-ring-2 focus:border-warning bg-backgroundError'
									: 'border-secondary focus:ring-secondary'
							}`}
						/>
						{formErrors.name && (
							<div className='flex items-center space-x-2 pt-1'>
								<img src='./assets/error-icon-warning.svg' alt='icon warning' />
								<p className='text-primary text-xs'>{formErrors.name}</p>
							</div>
						)}
					</div>
					<div>
						<label htmlFor='lastName' className='block text-sm text-primary'>
							Last Name
						</label>
						<input
							type='text'
							id='lastName'
							name='lastName'
							className={`w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:border-2 ${
								formErrors.lastName
									? 'border-warning border-2 focus-ring-2 focus:border-warning bg-backgroundError'
									: 'border-secondary focus:ring-secondary'
							}`}
							onChange={e => setFormData({ ...formData, lastName: e.target.value })}
						/>
						{formErrors.lastName && (
							<div className='flex items-center space-x-2 pt-1'>
								<img src='./assets/error-icon-warning.svg' alt='icon warning' />
								<p className='text-primary text-xs'>{formErrors.lastName}</p>
							</div>
						)}
					</div>
					<div>
						<label htmlFor='email' className='block text-sm text-primary'>
							Email Address
						</label>
						<input
							type='email'
							id='email'
							name='email'
							className={`w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:border-2 ${
								formErrors.email
									? 'border-warning border-2 focus-ring-2 focus:border-warning bg-backgroundError'
									: 'border-secondary focus:ring-secondary'
							}`}
							value={formData.email}
							onChange={e => setFormData({ ...formData, email: e.target.value })}
						/>
						{formErrors.email && (
							<div className='flex items-center space-x-2 pt-1'>
								<img src='./assets/error-icon-warning.svg' alt='icon warning' />
								<p className='text-primary text-xs'>{formErrors.email}</p>
							</div>
						)}
					</div>
					<div className='relative'>
						<label htmlFor='age' className='block text-sm text-primary'>
							Age
						</label>
						<span className='text-xs text-primary absolute start-0'>8</span>
						<span className='text-xs text-primary absolute end-0'>100</span>

						<input
							data-tooltip-target='tooltip-dark'
							type='range'
							id='age'
							name='age'
							min='8'
							max='100'
							value={formData.age}
							onChange={e => {
								setFormData({ ...formData, age: e.target.value })
								setTooltipValue(e.target.value)
								updateTooltipPosition(e.target.value)
							}}
							className='custom-range w-full py-3 mt-1 focus:outline-none bg accent-accent focus-secondary bg-primary'
						/>
						<div
							id='tooltip-dark'
							role='tooltip'
							className='absolute z-10  inline-block px-2 py-1 text-sm font-medium text-accent bg-white rounded-lg shadow-sm  tooltip dark:bg-gray-700'
							data-tooltip-placement='bottom'
							style={{ left: `calc(${tooltipPosition}% - 8px)` }}>
							{tooltipValue}
							<div className='tooltip-arrow' data-popper-arrow></div>
						</div>
						{/* <div
							className='absolute top-7 mt-8 transform -translate-x-1/2 border-b-secondary'
							style={{ left: `calc(${tooltipPosition}% + 8px)` }}>
							<div className='relative bg-white border border-secondary text-primary text-xs text-center rounded px-2 py-1 w-8'>
								{tooltipValue}
								<div className='absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-secondary'></div>
							</div>
						</div> */}
					</div>
					<div className='mb-4'>
						<label className='block text-sm text-primary'>Photo</label>
						<div
							className='border border-secondary rounded-lg p-4 text-center text-secondary bg-white'
							onDrop={handleDrop}
							onDragOver={handleDragOver}>
							<input type='file' onChange={handleFileChange} className='hidden' id='file-upload' />
							{!formData.photo && (
								<label htmlFor='file-upload' className='cursor-pointer'>
									<span className='text-accent underline'>Upload a file</span>{' '}
									<span className='text-textGray'>or drag and drop here</span>
								</label>
							)}
							{formData.photo && (
								<div className='mt-2 flex items-center justify-between'>
									<p className='text-gray-600'>{formData.photo.name}</p>
									<button onClick={e => setFormData({ ...formData, photo: null })}>
										<img src='./assets/delete.svg' alt='delete icon' className='w-4 h-4' />
									</button>
								</div>
							)}
						</div>
						{formErrors.photo && (
							<div className='flex items-center space-x-2 pt-1'>
								<img src='./assets/error-icon-warning.svg' alt='icon warning' />
								<p className='text-primary text-xs'>{formErrors.photo}</p>
							</div>
						)}
					</div>

					<Header text='Your workout' />
					<label className='block text-sm text-primary'>Date</label>
					<CustomDatePicker  />

					<div>
						<label htmlFor='email' className='block text-sm text-primary'>
							Time
						</label>
						{times.map((time, i) => (
							<button
								key={i}
								type='button'
								onClick={() => handleTimeClick(time)}
								className={`rounded border p-1 m-1 border-secondary inline text-primary focus-primary bg-white hover:border-accent ${
									formData.hour === time ? 'ring-1 ring-accent' : ''
								}`}>
								{time}
							</button>
						))}
					</div>

					<div>
						<button
							type='submit'
							disabled={isSubmitBtnDisabled}
							className={`w-full px-4 py-2 font-semibold text-white bg-secondary rounded hover:bg-accent focus:outline-none focus:primary ${
								isSubmitBtnDisabled ? '' : 'bg-accent'
							}`}>
							Send Application
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Form
