import {
  GET_USER_FETCHING,
  GET_USER_SUCCESS
} from '../types'

const initialState = {
  data: {},
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FETCHING: {
      return {
        ...state,
        isFetching: action.payload
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload.data
      }
    }
    default:
      return state
  }
}
