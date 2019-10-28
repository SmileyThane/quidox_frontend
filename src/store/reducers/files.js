import * as t from '../types'

const initialState = {
  list: [],
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.UPLOAD_FILE_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list,
          action.payload.data
        ]
      }
    case t.REMOVE_FILE_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.REMOVE_FILE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(i => i.id !== action.payload)
      }
    default:
      return state
  }
}
