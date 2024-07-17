import { configureStore } from '@reduxjs/toolkit'
import filters from '../reducers/filters'
import players from '../reducers/players'

const stringMiddleware = store => next => action => {
	if (typeof action === 'string') {
		return next({ type: action })
	}
	return next(action)
}

const store = configureStore({
	reducer: { players, filters },
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(stringMiddleware),
	devTools: true,
})

export default store
