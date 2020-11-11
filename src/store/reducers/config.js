import * as t from '../types'

const initialState = {
  data: {},
  isFetching: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case t.GET_CONFIG_REQUEST:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_CONFIG_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}
