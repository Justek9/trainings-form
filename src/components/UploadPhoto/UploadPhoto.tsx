import { useState } from 'react'
import { Data } from '../../types'
import Label from '../Label/Label'

type UploadPhotoProps = {
	setFormData: React.Dispatch<React.SetStateAction<Data>>
	formData: Data
	label: string
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ setFormData, formData, label }) => {
	const [deleteIconSrc, setDeleteIconSrc] = useState('./assets/delete.svg')

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0]
			setFormData({ ...formData, photo: file })
		} else {
			setFormData({ ...formData, photo: null })
		}
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

	return (
		<div className='mb-7 mt-8'>
			<Label label={label} />
			<div
				className='border border-secondary rounded-lg p-4 text-center text-secondary bg-white h-24 flex flex-row justify-center items-center'
				onDrop={handleDrop}
				onDragOver={handleDragOver}>
				<input type='file' onChange={handleFileChange} className='hidden' id='file-upload' />
				{!formData.photo && (
					<label htmlFor='file-upload' className='cursor-pointer'>
						<span className='text-accent underline'>Upload a file</span>
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
	)
}

export default UploadPhoto
