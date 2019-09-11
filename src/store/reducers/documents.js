import * as t from '../types'

const initialState = {
  draftDocuments: {},
  inboxDocuments: {},
  outDocuments: {},
  singleDocument: {},
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
    case t.GET_DOCUMENT_BY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        singleDocument: action.payload.data
      }
    case t.UPDATE_DOCUMENT_BY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.UPDATE_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        singleDocument: {
          ...state.singleDocument,
          name: action.payload.data.name,
          description: action.payload.data.description
        }
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

    case t.GET_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_INBOX_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        inboxDocuments: action.payload.data
      }

    case t.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      console.log(action.payload.data)
      return {
        ...state,
        outDocuments: action.payload.data
      }

    case t.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        draftDocuments: action.payload.data
      }

    // remove documents
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
    case t.REMOVE_INBOX_UNCONFIRMED_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        inboxDocuments: {
          ...state.inboxDocuments,
          inboxUnconfirmedDocuments: state.inboxDocuments.inboxUnconfirmedDocuments.filter(i => i.id !== action.payload)
        }
      }
    case t.REMOVE_INBOX_CONFIRMED_DOCUMENT_BY_ID_SUCCESS: {
      return {
        ...state,
        inboxDocuments: {
          ...state.inboxDocuments,
          inboxConfirmedDocuments: state.inboxDocuments.inboxConfirmedDocuments.filter(i => i.id !== action.payload)
        }
      }
    }
    case t.REMOVE_OUT_CONFIRMED_DOCUMENT_BY_ID_SUCCESS: {
      return {
        ...state,
        outDocumentsList: {
          ...state.outDocumentsList,
          outConfirmedDocuments: state.outDocumentsList.outConfirmedDocuments.filter(i => i.id !== action.payload)
        }
      }
    }
    case t.REMOVE_OUT_UNCONFIRMED_DOCUMENT_BY_ID_SUCCESS: {
      return {
        ...state,
        outDocumentsList: {
          ...state.outDocumentsList,
          outUnconfirmedDocuments: state.outDocumentsList.outUnconfirmedDocuments.filter(i => i.id !== action.payload)
        }
      }
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
    case t.REMOVE_INBOX_UNCONFIRMED_DOCUMENTS_BY_IDS_SUCCESS: {
      return {
        ...state,
        inboxDocuments: {
          ...state.inboxDocuments,
          inboxUnconfirmedDocuments: state.inboxDocuments.inboxUnconfirmedDocuments.filter(i => action.payload.ids.indexOf(i.id) === -1)
        }
      }
    }
    case t.REMOVE_INBOX_CONFIRMED_DOCUMENTS_BY_IDS_SUCCESS: {
      return {
        ...state,
        inboxDocuments: {
          ...state.inboxDocuments,
          inboxConfirmedDocuments: state.inboxDocuments.inboxConfirmedDocuments.filter(i => action.payload.ids.indexOf(i.id) === -1)
        }
      }
    }
    case t.REMOVE_OUT_CONFIRMED_DOCUMENTS_BY_IDS_SUCCESS: {
      return {
        ...state,
        outDocumentsList: {
          ...state.outDocumentsList,
          outConfirmedDocuments: state.outDocumentsList.outConfirmedDocuments.filter(i => action.payload.ids.indexOf(i.id) === -1)
        }
      }
    }
    case t.REMOVE_OUT_UNCONFIRMED_DOCUMENTS_BY_IDS_SUCCESS: {
      return {
        ...state,
        outDocumentsList: {
          ...state.outDocumentsList,
          outUnconfirmedDocuments: state.outDocumentsList.outUnconfirmedDocuments.filter(i => action.payload.ids.indexOf(i.id) === -1)
        }
      }
    }
    default:
      return state
  }
}
