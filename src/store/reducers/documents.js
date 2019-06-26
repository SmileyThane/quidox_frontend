import * as t from '../types'
import { id } from 'postcss-selector-parser';

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
    case t.CREATE_DOCUMENT_FETHCING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_INBOX_UNCONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_INBOX_UNCONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        inboxDocuments: {
          ...state.inboxDocuments,
          inboxUnconfirmedDocuments: action.payload.data
        }
      }
    case t.GET_INBOX_CONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_INBOX_CONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        inboxDocuments: {
          ...state.inboxDocuments,
          inboxConfirmedDocuments: action.payload.data
        }
      }
    case t.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        outDocumentsList: action.payload.data
      }
    case t.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        draftDocumentsList: action.payload.data
      }
    case t.REMOVE_DOCUMENT_BY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.REMOVE_DRAFT_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        draftDocumentsList: state.draftDocumentsList.filter(i => i.id !== action.payload)
      }
    case t.REMOVE_DOCUMENTS_BY_IDS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.REMOVE_DRAFT_DOCUMENTS_BY_IDS_SUCCESS:
      return {
        ...state,
        draftDocumentsList: state.draftDocumentsList.filter(i => action.payload.ids.indexOf(i.id) === -1)
      }
    default:
      return state
  }
}
