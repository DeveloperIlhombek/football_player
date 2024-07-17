import empty from '../assets/empty.png'

const Empty = () => {
	return (
		<div className='flex justify-center items-center w-full h-full'>
			<img src={empty} alt='Empty' className='object-cover' />
		</div>
	)
}

export default Empty
