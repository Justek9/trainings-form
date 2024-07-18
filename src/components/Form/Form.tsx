import React, { ChangeEvent, useEffect, useState } from 'react'
import Header from '../Header/Header'
import CustomDatePicker from '../DatePicker/CustomDatePicker'
import { Data, FormErrors } from '../../types'
import { URL_POST_FD, maxAge, minAge, times } from '../../utilsData'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { validateForm } from '../../helperfunctions'

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
	const [tooltipValue, setTooltipValue] = useState<number | string>(formData.age)
	const [tooltipPosition, setTooltipPosition] = useState(0)
	const [deleteIconSrc, setDeleteIconSrc] = useState('./assets/delete.svg')

	useEffect(() => {
		const rangeInput = document.querySelector('.custom-range') as HTMLInputElement
		if (rangeInput) {
			rangeInput.style.setProperty('--value', `${tooltipPosition}%`)
		}
	}, [tooltipPosition])

	useEffect(() => {
		updateTooltipPosition(formData.age)
	}, [formData.age])

	useEffect(() => {
		isSendApplicationBtnDisabled()
	}, [formData])

	const updateTooltipPosition = (value: number | string) => {
		const min = Number(minAge)
		const max = Number(maxAge)

		const newPosition = ((Number(value) - min) / (max - min)) * 100
		setTooltipPosition(newPosition)
	}

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

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0]
			setFormData({ ...formData, photo: file })
		} else {
			setFormData({ ...formData, photo: null })
		}
	}

	const handleTimeClick = (time: string) => {
		setFormData({ ...formData, hour: time })
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
							onChange={e => handleInputChange('name', e.target.value)}
							className={`w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:border  ${
								formErrors.name
									? 'border-warning border-2 focus-ring-2 focus:border-warning bg-backgroundError'
									: 'border-secondary focus:ring-borderFocus'
							}`}
						/>
						{formErrors.name && <ErrorMessage message={formErrors.name} />}
					</div>
					<div>
						<label htmlFor='lastName' className='block text-sm text-primary'>
							Last Name
						</label>
						<input
							type='text'
							id='lastName'
							name='lastName'
							className={`w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:border  ${
								formErrors.lastName
									? 'border-warning border-2 focus-ring-2 focus:border-warning bg-backgroundError'
									: 'border-secondary focus:ring-borderFocus'
							}`}
							onChange={e => handleInputChange('lastName', e.target.value)}
						/>
						{formErrors.lastName && <ErrorMessage message={formErrors.lastName} />}
					</div>
					<div>
						<label htmlFor='email' className='block text-sm text-primary'>
							Email Address
						</label>
						<input
							type='email'
							id='email'
							name='email'
							className={`w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:border  ${
								formErrors.email
									? 'border-warning border-2 focus-ring-2 focus:border-warning bg-backgroundError'
									: 'border-secondary focus:ring-borderFocus'
							}`}
							value={formData.email}
							onChange={e => handleInputChange('email', e.target.value)}
						/>
						{formErrors.email && <ErrorMessage message={formErrors.email} />}
					</div>
					<div className='relative'>
						<label htmlFor='age' className='block text-sm text-primary'>
							Age
						</label>
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
							className='custom-range w-full py-3 mt-2 focus:outline-none bg accent-accent focus-secondary bg-primary'
						/>
						<div
							className='absolute top-7 mt-8 transform -translate-x-1/2 border-b-secondary'
							style={{ left: `calc(${tooltipPosition}% + 8px)` }}>
							<div className='relative bg-white border border-secondary text-accent text-xs text-center rounded py-1 w-8'>
								{tooltipValue}
								<div className='absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-white border border-secondary border-r-0 border-b-0'></div>
							</div>
						</div>
					</div>
					<div className='mb-4'>
						<label className='block text-sm text-primary mt-8'>Photo</label>
						<div
							className='border border-secondary rounded-lg p-4 text-center text-secondary bg-white'
							onDrop={handleDrop}
							onDragOver={handleDragOver}>
							<input type='file' onChange={handleFileChange} className='hidden' id='file-upload' />
							{!formData.photo && (
								<label htmlFor='file-upload' className='cursor-pointer'>
									<span className='text-accent underline'>Upload a file </span>
									<span className='text-textGray hidden md:inline'>&nbsp; or drag and drop here</span>
								</label>
							)}
							{formData.photo && (
								<div className='mt-2 flex items-center justify-center'>
									<p className='text-primary pr-1'>{formData.photo.name}</p>
									<button onClick={e => setFormData({ ...formData, photo: null })}>
										<img
											src={deleteIconSrc}
											onMouseEnter={() => setDeleteIconSrc('./assets/deleteHover.svg')}
											onMouseLeave={() => setDeleteIconSrc('./assets/delete.svg')}
											alt='delete icon'
											className='w-4 h-4'
										/>
									</button>
								</div>
							)}
						</div>
					</div>

					<Header text='Your workout' />

					<section className='flex flex-col md:flex-row md:items-start gap-4'>
						<div className='flex-1'>
							<label className='block text-sm text-primary'>Date</label>
							<CustomDatePicker setFormData={setFormData} formData={formData} />
						</div>
						{formData.date && (
							<div className='flex-1'>
								<label htmlFor='email' className='block text-sm text-primary'>
									Time
								</label>
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
						)}
					</section>

					<div>
						<button
							type='submit'
							disabled={isSubmitBtnDisabled}
							className={`w-full px-4 py-2 font-semibold text-white  rounded  focus:outline-none focus:primary ${
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
