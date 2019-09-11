import * as t from '../types'

const initialState = {
  draftDocuments: {},
  inboxDocuments: {},
  outDocuments: {},
  archiveDocuments: {},
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
      return {
        ...state,
        outDocuments: action.payload.data
      }

    case t.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        draftDocuments: action.payload.data
      }

    case t.GET_ARCHIVE_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        archiveDocuments: action.payload.data
      }

    case t.REMOVE_DOCUMENT_BY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }

    case t.REMOVE_DRAFT_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        draftDocuments: {
          ...state.draftDocuments,
          data: state.draftDocuments.data.filter(i => i.document_id !== action.payload)
        }
      }

    case t.REMOVE_INBOX_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        inboxDocuments: {
          ...state.inboxDocuments,
          data: state.inboxDocuments.data.filter(i => i.document_id !== action.payload)
        }
      }

    case t.REMOVE_OUT_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        outDocuments: {
          ...state.outDocuments,
          data: state.outDocuments.data.filter(i => i.document_id !== action.payload)
        }
      }

    case t.REMOVE_ARCHIVE_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        archiveDocuments: {
          ...state.archiveDocuments,
          data: state.archiveDocuments.data.filter(i => i.document_id !== action.payload)
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
        draftDocuments: {
          ...state.draftDocuments,
          data: state.draftDocuments.data.filter(i => action.payload.ids.indexOf(i.document_id) === -1)
        }
      }

    case t.REMOVE_INBOX_DOCUMENTS_BY_IDS_SUCCESS:
      return {
        ...state,
        inboxDocuments: {
          ...state.inboxDocuments,
          data: state.inboxDocuments.data.filter(i => action.payload.ids.indexOf(i.document_id) === -1)
        }
      }

    case t.REMOVE_OUT_DOCUMENTS_BY_IDS_SUCCESS:
      return {
        ...state,
        outDocuments: {
          ...state.outDocuments,
          data: state.outDocuments.data.filter(i => action.payload.ids.indexOf(i.document_id) === -1)
        }
      }

    case t.REMOVE_ARCHIVE_DOCUMENTS_BY_IDS_SUCCESS:
      return {
        ...state,
        archiveDocuments: {
          ...state.archiveDocuments,
          data: state.archiveDocuments.data.filter(i => action.payload.ids.indexOf(i.document_id) === -1)
        }
      }

    default:
      return state
  }
}
