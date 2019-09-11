import { combineReducers } from 'redux'

import user from './user'
import company from './company'
import documents from './documents'

export default combineReducers({
  user,
  documents,
  company
})
