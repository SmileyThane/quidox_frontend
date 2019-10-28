import { combineReducers } from 'redux'
import * as t from '../types'

import user from './user'
import companies from './companies'
import documents from './documents'
import files from './files'

const appReducer = combineReducers({
  user,
  documents,
  companies,
  files
})

const rootReducer = (state, action) => {
  if (action.type === t.USER_LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
