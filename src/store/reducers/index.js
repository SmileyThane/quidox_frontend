import { combineReducers } from 'redux'

import user from './user'
import companies from './companies'
import documents from './documents'

export default combineReducers({
  user,
  documents,
  companies
})
