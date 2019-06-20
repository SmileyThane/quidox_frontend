import {
  CREATE_DOCUMENT_FETHCING,
  CREATE_DOCUMENT_SUCCESS
} from '../types'

const initialState = {
  list: [],
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOCUMENT_FETHCING:
      return {
        ...state,
        isFetching: action.payload
      }
    case CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        isFetching: action.payload
      }
    default:
      return state
  }
}
