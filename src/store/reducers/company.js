import * as t from '../types'

const initalState = {
  list: [],
  isFetching: false
}

export default (state = initalState, action) => {
  switch (action.type) {
    case t.GET_COMPANY_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_COMPANY_SUCCESS:
      return {
        ...state,
        list: action.payload.data
      }
    case t.CREATE_COMPANY_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.CREATE_COMPANY_SUCCESS:
      const res = JSON.parse(JSON.stringify(action.payload.data))

      return {
        ...state,
        list: [...state.list, res]
      }
    default:
      return state
  }
}
