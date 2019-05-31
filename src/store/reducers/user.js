import {
  GET_USER_FETCHING,
  GET_USER_SUCCESS
} from '../types'

const initialState = {
  data: null,
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
        data: action.payload
      }
    }
    default:
      return state
  }
}
