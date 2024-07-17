import { createReducer } from '@reduxjs/toolkit'
import {
	activeFilterChanged,
	filtersFetched,
	filtersFetching,
	filtersFetchingError,
} from '../actions'

const initialState = {
	filters: [],
	filtersLoadingStatus: 'success',
	activeFilter: 'All',
}
const filters = createReducer(initialState, builder => {
	builder
		.addCase(filtersFetching, state => {
			state.filtersLoadingStatus = 'loading'
		})
		.addCase(filtersFetched, (state, action) => {
			;(state.filters = action.payload),
				(state.filtersLoadingStatus = 'success')
		})
		.addCase(filtersFetchingError, state => {
			state.filtersLoadingStatus = 'error'
		})
		.addCase(activeFilterChanged, (state, action) => {
			state.activeFilter = action.payload
		})
		.addDefaultCase(state => state)
})

export default filters
