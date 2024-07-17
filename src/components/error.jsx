import error from '../assets/error.png'

const Error = () => {
	return (
		<div className='flex justify-center items-center w-full h-full'>
			<img src={error} alt='Error' className='object-cover' />
		</div>
	)
}

export default Error
