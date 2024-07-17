import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeFilterChanged, fetchingFilter } from '../actions'
import { useHttp } from '../hooks/use-http'
import Spinner from './spinner'

const PlayersFilter = () => {
	const { filters, filtersLoadingStatus, activeFilter } = useSelector(
		state => state.filters
	)
	const dispatch = useDispatch()
	const { request } = useHttp()

	useEffect(() => {
		dispatch(fetchingFilter(request))
	}, [])

	if (filtersLoadingStatus === 'loading') {
		return <Spinner classNames={'w-8 h-8 block mx-auto text-white'} />
	} else if (filtersLoadingStatus === 'error') {
		return <span className='text-red-500'>Something went wrong</span>
	}

	const renderFilters = () => {
		if (!filters.length) {
			return <span className='text-red-500'>Filters not found</span>
		}

		return filters.map(({ id, label, classes }) => (
			<button
				key={id}
				className={`py-2 px-4 text-white hover:opacity-90 transition-all ${classes} ${
					activeFilter === label && 'text-black font-bold'
				}`}
				onClick={() => dispatch(activeFilterChanged(label))}
			>
				{label}
			</button>
		))
	}

	return (
		<div className='px-4 py-6 bg-white rounded-md shadow-lg bg-gradient-to-b from-cyan-500 to-transparent bg-opacity-10 mt-4'>
			<h1 className='text-xl font-bold'>Filter players by continent</h1>

			<div className='flex mt-2'>{renderFilters()}</div>
		</div>
	)
}

export default PlayersFilter
