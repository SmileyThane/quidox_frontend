import {
  GET_DOCUMENT_BY_ID_FETCHING,
  GET_DOCUMENT_BY_ID_SUCCESS
} from '../types'

const initialState = {
  data: {},
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENT_BY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case GET_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      }
    default:
      return state
  }
}
