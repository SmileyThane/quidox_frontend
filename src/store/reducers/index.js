import { combineReducers } from 'redux'
import * as t from '../types'

import user from './user'
import companies from './companies'
import documents from './documents'

const appReducer = combineReducers({
  user,
  documents,
  companies
})

const rootReducer = (state, action) => {
  if (action.type === t.USER_LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
