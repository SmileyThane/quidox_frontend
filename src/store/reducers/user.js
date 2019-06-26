import * as p from '../types'

const initialState = {
  data: {},
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case p.GET_USER_FETCHING: {
      return {
        ...state,
        isFetching: action.payload
      }
    }
    case p.GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload.data
      }
    }
    default:
      return state
  }
}
