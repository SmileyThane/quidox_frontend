import { combineReducers } from 'redux'

import user from './user'
import company from './company'
import documents from './documents'
import drafts from './drafts'

export default combineReducers({
  user,
  documents,
  drafts,
  company
})
