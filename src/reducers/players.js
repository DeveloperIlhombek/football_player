import { createReducer } from '@reduxjs/toolkit'
import {
	playerDeleted,
	playersCreated,
	playersFetched,
	playersFetching,
	playersFetchingError,
} from '../actions'

const initialState = {
	players: [],
	playersLoadingStatus: 'success',
}

const players = createReducer(initialState, builder => {
	builder
		.addCase(playersFetching, state => {
			state.playersLoadingStatus = 'loading'
		})
		.addCase(playersFetched, (state, action) => {
			;(state.players = action.payload),
				(state.playersLoadingStatus = 'success')
		})
		.addCase(playersFetchingError, state => {
			state.playersLoadingStatus = 'error'
		})
		.addCase(playersCreated, (state, action) => {
			state.players.push(action.payload)
		})
		.addCase(playerDeleted, (state, action) => {
			state.players = state.players.filter(
				player => player.id !== action.payload
			)
		})
		.addDefaultCase(() => {})
})
export default players
