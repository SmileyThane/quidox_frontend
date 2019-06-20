import {
  CREATE_DOCUMENT_FETHCING,
  CREATE_DOCUMENT_SUCCESS,
  GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
  GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS
} from '../types'

const initialState = {
  list: [],
  outDocumentsList: [],
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOCUMENT_FETHCING:
      return {
        ...state,
        isFetching: action.payload
      }
    case CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        isFetching: action.payload
      }
    case GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        outDocumentsList: action.payload.data
      }
    default:
      return state
  }
}
