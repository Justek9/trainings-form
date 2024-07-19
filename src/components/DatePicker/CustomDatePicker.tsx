import 'react-datepicker/dist/react-datepicker.css'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { API_KEY_DATA, countryCode, yearSelected } from '../../utilsData'
import { Data, Holiday } from '../../types'

type CustomDatePickerProps = {
	setFormData: React.Dispatch<React.SetStateAction<Data>>
	formData: Data
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ setFormData, formData }) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [holidays, setHolidays] = useState<Holiday[]>([])
	const [observance, setObservance] = useState<Holiday[]>([])
	const [selectedDayObservance, setSelectedDayObservance] = useState<Holiday | null>(null)

	useEffect(() => {
		const getHolidays = async () => {
			const options = {
				method: 'GET',
				headers: {
					'X-Api-Key': API_KEY_DATA,
				},
			}

			const res = await fetch(
				`https://api.api-ninjas.com/v1/holidays?country=${countryCode}&year=${yearSelected}`,
				options
			)
			const data: Holiday[] = await res.json()
			setHolidays(
				data.filter(holiday => {
					return holiday.type === 'NATIONAL_HOLIDAY'
				})
			)

			setObservance(
				data.filter(holiday => {
					return holiday.type === 'OBSERVANCE'
				})
			)
		}

		getHolidays()
	}, [])

	useEffect(() => {
		const obs = observance.filter(observance => {
			return (
				observance.date.toString() ===
				selectedDate?.toLocaleDateString('en-CA', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
				})
			)
		})
		setSelectedDayObservance(obs[0])
		setFormData({ ...formData, date: selectedDate ? selectedDate.toISOString() : null })
	}, [selectedDate])

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date)
	}

	const isSunday = (date: Date) => {
		const day = date.getDay()
		return day !== 0
	}

	return (
		<>
			<div className='p-6 max-w-xs bg-white border border-secondary rounded-md w-full flex justify-center items-center'>
				<DatePicker
					selected={selectedDate}
					onChange={handleDateChange}
					calendarStartDay={1}
					inline
					renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
						<div className='flex justify-between items-center px-2 py-2 bg-white'>
							<button
								onClick={e => {
									e.preventDefault()
									decreaseMonth()
								}}
								className='focus:outline-none'>
								<img src='./assets/left.jpg' alt='left arrow' />
							</button>
							<span className='text-lg text-primary font-medium'>{format(date, 'MMMM yyyy')}</span>
							<button
								onClick={e => {
									e.preventDefault()
									increaseMonth()
								}}
								className='focus:outline-none'>
								<img src='./assets/right.jpg' alt='right arrow' />
							</button>
						</div>
					)}
					dayClassName={date => {
						const isSelected = date.toDateString() === selectedDate?.toDateString()
						return `cursor-pointer rounded-full hover:bg-secondary hover:rounded-full 
						${isSelected ? 'bg-accent text-white' : 'bg-white text-primary'}`
					}}
					excludeDates={holidays}
					minDate={new Date()}
					maxDate={new Date('2024-12-31')}
					filterDate={isSunday}
				/>
			</div>

			{selectedDayObservance && (
				<div className='flex flex-row justify-left items-center mt-2'>
					<img className='pr-2' src='./assets/info-icon.svg' alt='info icon' />
					<p className='text-primary text-base'>It's {selectedDayObservance.name}.</p>
				</div>
			)}
		</>
	)
}

export default CustomDatePicker
