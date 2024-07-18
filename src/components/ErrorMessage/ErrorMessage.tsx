type errorMesageProps = {
	message: string
}

const ErrorMessage = ({ message }: errorMesageProps) => {
	return (
		<div className='flex items-center space-x-2 pt-1'>
			<img src='./assets/error-icon-warning.svg' alt='icon warning' />
			<p className='text-primary text-xs' dangerouslySetInnerHTML={{ __html: message }}></p>
		</div>
	)
}

export default ErrorMessage
