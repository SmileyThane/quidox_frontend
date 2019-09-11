import * as t from '../types'

const initialState = {
  data: {},
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.GET_DOCUMENT_BY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      }
    case t.VERIFY_DOCUMENT_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.VERIFY_DOCUMENT_SUCCESS:
      return {
        ...state
      }
    case t.UPDATE_DOCUMENT_BY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.UPDATE_DOCUMENT_BY_ID_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        data: {
          ...state.data,
          name: action.payload.data.name
        }
      }
    default:
      return state
  }
}
