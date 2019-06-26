import * as p from '../types'

const initialState = {
  outDocumentsList: [],
  draftDocumentsList: [],
  inboxDocuments: {
    inboxConfirmedDocuments: [],
    inboxUnconfirmedDocuments: []
  },
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case p.CREATE_DOCUMENT_FETHCING:
      return {
        ...state,
        isFetching: action.payload
      }
    case p.CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        isFetching: action.payload
      }
    case p.GET_INBOX_UNCONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case p.GET_INBOX_UNCONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        inboxDocuments: {
          ...state.inboxDocuments,
          inboxUnconfirmedDocuments: action.payload.data
        }
      }
    case p.GET_INBOX_CONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case p.GET_INBOX_CONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        inboxDocuments: {
          ...state.inboxDocuments,
          inboxConfirmedDocuments: action.payload.data
        }
      }
    case p.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case p.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        outDocumentsList: action.payload.data
      }
    case p.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case p.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        draftDocumentsList: action.payload.data
      }
    default:
      return state
  }
}
