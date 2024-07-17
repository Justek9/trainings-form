type headerProps = {
	text: string
}

const Header = ({ text }: headerProps) => {
	return <p className='text-2xl font-medium text-primary'>{text}</p>
}

export default Header
