import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { fetchPlayers, playerDeleted } from '../actions'
import { useHttp } from '../hooks/use-http'
import Empty from './empty'
import Error from './error'
import PlayersListItem from './players-list-item'
import Spinner from './spinner'

const PlayersList = () => {
	const filteredPlayersSelector = createSelector(
		state => state.filters.activeFilter,
		state => state.players.players,
		(filters, players) => {
			if (filters === 'All') {
				return players
			} else {
				return players.filter(player => player.continent === filters)
			}
		}
	)
	const filteredPlayers = useSelector(filteredPlayersSelector)
	const playersLoadingStatus = useSelector(
		state => state.players.playersLoadingStatus
	)
	const dispatch = useDispatch()
	const { request } = useHttp()

	useEffect(() => {
		dispatch(fetchPlayers(request))
	}, [dispatch, request])

	const onDelete = useCallback(
		id => {
			request(`http://localhost:3000/players/${id}`, 'DELETE')
				.then(() => {
					dispatch(playerDeleted(id))
				})
				.catch(e => console.log(e))
		},
		[request]
	)

	if (playersLoadingStatus === 'loading') {
		return <Spinner classNames={'w-8 h-8 block mx-auto text-white'} />
	} else if (playersLoadingStatus === 'error') {
		return <Error />
	}

	const renderPlayers = () => {
		if (!filteredPlayers.length) {
			return <Empty />
		}

		return filteredPlayers.map(({ id, ...props }) => (
			<PlayersListItem key={id} onDelete={() => onDelete(id)} {...props} />
		))
	}

	return <div className='flex flex-col space-y-3'>{renderPlayers()}</div>
}

export default PlayersList
