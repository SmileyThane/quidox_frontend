import * as t from '../types'

const initialState = {
  data: {},
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.GET_USER_FETCHING: {
      return {
        ...state,
        isFetching: action.payload
      }
    }
    case t.GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload.data
      }
    }
    default:
      return state
  }
}
