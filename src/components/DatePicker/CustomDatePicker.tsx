import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'

const CustomDatePicker: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date)
	}

	return (
		<div className='p-6 max-w-xs mx-auto bg-white border border-secondary rounded-md w-full'>
			<DatePicker
				selected={selectedDate}
				onChange={handleDateChange}
				inline
				renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
					<div className='flex justify-between items-center px-2 py-2 bg-white'>
						<button onClick={decreaseMonth} className='focus:outline-none'>
							<img src='./assets/left.jpg' alt='left arrow' />
						</button>
						<span className='text-lg text-gray-700 font-medium'>{format(date, 'MMMM yyyy')}</span>
						<button onClick={increaseMonth} className='focus:outline-none'>
							<img src='./assets/right.jpg' alt='right arrow' />
						</button>
					</div>
				)}
				dayClassName={date => {
					const isSelected = date.getDate() === (selectedDate ? selectedDate.getDate() : new Date().getDate())
					return `cursor-pointer rounded-full ${
						isSelected ? 'bg-indigo-500 text-white' : 'text-gray-700'
					} hover:bg-secondary`
				}}
			/>
		</div>
	)
}

export default CustomDatePicker
