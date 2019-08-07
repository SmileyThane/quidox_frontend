import * as t from '../types'

const initialState = {
  draftDocumentsList: [],
  inboxDocuments: {
    inboxConfirmedDocuments: [],
    inboxUnconfirmedDocuments: []
  },
  outDocumentsList: {
    outConfirmedDocuments: [],
    outUnconfirmedDocuments: []
  },
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    // Create document
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

    // Inbox unconfirmed documents
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

    // Inbox confirmed documents
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

    // Out confirmed documents
    case t.GET_OUT_CONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_OUT_CONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        outDocumentsList: {
          ...state.outDocumentsList,
          outConfirmedDocuments: action.payload.data
        }
      }
    
    // Out unconfirmed documents
    case t.GET_OUT_UNCONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_OUT_UNCONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        outDocumentsList: {
          ...state.outDocumentsList,
          outUnconfirmedDocuments: action.payload.data
        }
      }

    // draft documents
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
