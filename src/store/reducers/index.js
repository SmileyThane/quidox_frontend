import { combineReducers } from 'redux'

import user from './user'
import company from './company'
import document from './document'
import documents from './documents'

export default combineReducers({
  user,
  document,
  documents,
  company
})
