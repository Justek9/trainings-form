import React from 'react'

const Form = () => {
	return (
		<section className='flex items-center justify-center min-h-screen bg-backgroud'>
			<div className='w-full max-w-md p-8 space-y-6'>
				<p className='text-2xl font-medium text-primary'>Personal info</p>
				<form className='space-y-4'>
					<div>
						<label htmlFor='name' className='block text-sm font-medium text-primary'>
							First Name
						</label>
						<input
							type='text'
							id='name'
							name='name'
							className='w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-warning'
							required
						/>
					</div>
					<div>
						<label htmlFor='lastName' className='block text-sm font-medium text-primary'>
							Last Name
						</label>
						<input
							type='text'
							id='lastName'
							name='lastName'
							className='w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-warning'
							required
						/>
					</div>
					<div>
						<label htmlFor='email' className='block text-sm font-medium text-primary'>
							Email Address
						</label>
						<input
							type='email'
							id='email'
							name='email'
							className='w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-warning'
							required
						/>
					</div>
					<div className='relative'>
						<label htmlFor='age' className='block text-sm font-medium text-primary'>
							Age
						</label>
						<span className='text-xs text-primary absolute start-0'>8</span>
						<span className='text-xs text-primary absolute end-0'>100</span>

						<input
							type='range'
							id='age'
							name='age'
							min='8'
							max='100'
							className='w-full px-3 py-2 mt-1 bg-primary border border-gray-300 rounded focus:outline-none'
							required
						/>
					</div>

					<div>
						<button
							type='submit'
							className='w-full px-4 py-2 font-semibold text-white bg-secondary rounded hover:bg-accent focus:outline-none focus:primary'>
							Send Application
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Form
