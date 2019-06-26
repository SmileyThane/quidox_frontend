import * as p from '../types'

const initalState = {
  list: [],
  isFetching: false
}

export default (state = initalState, action) => {
  switch (action.type) {
    case p.GET_COMPANY_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case p.GET_COMPANY_SUCCESS:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state
  }
}
