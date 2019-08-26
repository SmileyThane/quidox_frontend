import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './reducers'

const middlewares = [
  thunk
]

if (true || process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)
