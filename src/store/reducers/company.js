import {
  GET_COMPANY_FETCHING,
  GET_COMPANY_SUCCESS
} from '../types'

const initalState = {
  list: [],
  isFetching: false
}

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_COMPANY_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state
  }
}
