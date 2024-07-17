import { FiLoader } from 'react-icons/fi'

const Spinner = ({ classNames }) => {
	return <FiLoader className={`animate-spin ${classNames}`} />
}

export default Spinner
