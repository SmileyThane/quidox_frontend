import * as t from '../types'

const initialState = {
  list: [],
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.GET_TARIFF_FETCHING: {
      return {
        ...state,
        isFetching: action.payload
      }
    }
    case t.GET_TARIFF_SUCCESS: {
      return {
        ...state,
        list: action.payload
      }
    }
    default:
      return state
  }
}
