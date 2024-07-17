import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { playersCreated } from '../actions'
import { useHttp } from '../hooks/use-http'

const PlayersAddForm = () => {
	const { filters, filtersLoadingStatus } = useSelector(state => state.filters)
	const dispatch = useDispatch()
	const { request } = useHttp()

	const onSubmit = event => {
		event.preventDefault()
		const name = event.target.name.value
		const country = event.target.country.value
		const continent = event.target.continent.value

		const data = {
			id: uuidv4(),
			name,
			country,
			continent,
		}

		request('http://localhost:3000/players', 'POST', JSON.stringify(data))
			.then(res => console.log(res, 'Successfully created'))
			.then(dispatch(playersCreated(data)))
			.catch(e => console.log(e))
	}

	const renderFilters = () => {
		if (filtersLoadingStatus === 'loading') {
			return <option>Loading...</option>
		} else if (filtersLoadingStatus === 'error') {
			return <option>Something went wrong</option>
		}

		if (filters && filters.length > 0) {
			return filters.map(({ id, label }) => {
				if (id == 'all') return

				return (
					<option key={id} value={label}>
						{label}
					</option>
				)
			})
		}
	}

	return (
		<div className='px-4 py-6 bg-white rounded-md shadow-lg bg-gradient-to-t from-cyan-500 to-transparent bg-opacity-10'>
			<form onSubmit={onSubmit}>
				<div className='flex flex-col space-y-3'>
					<div>
						<label htmlFor='name' className='text-2xl'>
							New football player
						</label>
						<input
							type='text'
							className='block w-full py-2 px-4 rounded-md mt-1'
							placeholder='Mohammad Salah'
							name='name'
							required
						/>
					</div>

					<div>
						<label htmlFor='country' className='text-2xl'>
							Country
						</label>
						<input
							type='text'
							className='block w-full py-2 px-4 rounded-md mt-1'
							placeholder='Egypt'
							name='country'
							required
						/>
					</div>

					<div>
						<label htmlFor='continent' className='text-2xl'>
							Select player continent
						</label>
						<select
							className='block w-full py-2 px-4 rounded-md mt-1'
							name='continent'
							required
						>
							{renderFilters()}
						</select>
					</div>

					<button
						className='py-2 px-4 w-fit rounded-md ml-auto bg-gradient-to-r from-blue-500 to-blue-950 text-white hover:scale-105 transition-all font-medium'
						type='submit'
					>
						Add player
					</button>
				</div>
			</form>
		</div>
	)
}

export default PlayersAddForm
