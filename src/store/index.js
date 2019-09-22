import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './reducers'

const middlewares = [
  thunk
]

const composeEnhancers = composeWithDevTools({
})

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
)
