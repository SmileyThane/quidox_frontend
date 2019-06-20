import {
  GET_DRAFTS_BY_ACTIVE_COMPANY_ID_FETCHING,
  GET_DRAFTS_BY_ACTIVE_COMPANY_ID_SUCCESS
} from '../types'

const initialState = {
  list: null,
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DRAFTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case GET_DRAFTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        list: action.payload.data
      }
    default:
      return state
  }
}
