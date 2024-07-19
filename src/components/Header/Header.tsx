type HeaderProps = {
	text: string
}

const Header: React.FC<HeaderProps> = ({ text }) => {
	return <p className='text-2xl font-medium text-primary'>{text}</p>
}

export default Header
