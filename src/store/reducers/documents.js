import * as t from '../types'

const initialState = {
  documents: {},
  singleDocument: {},
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.CREATE_DOCUMENT_FETCHING:
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
          document: {
            ...state.singleDocument.document,
            name: action.payload.data.name,
            description: action.payload.data.description
          }
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

    case t.GET_DOCUMENTS_BY_ACTIVE_COMPANY_ID_REQUEST_FETCHING:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        documents: action.payload.data
      }
    case t.GET_DOCUMENTS_BY_ACTIVE_COMPANY_ID_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS:
      return {
        ...state,
        documents: action.payload.data
      }

    case t.REMOVE_DOCUMENT_BY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }

    case t.REMOVE_DOCUMENT_BY_ID_SUCCESS: {
      return {
        ...state,
        documents: {
          ...state.documents,
          data: state.documents.data.filter(i => i.id !== action.payload)
        }
      }
    }

    case t.REMOVE_DOCUMENTS_BY_IDS_FETCHING: {
      return {
        ...state,
        isFetching: action.payload
      }
    }

    case t.REMOVE_DOCUMENTS_BY_IDS_SUCCESS: {
      return {
        ...state,
        documents: {
          ...state.documents,
          data: state.documents.data.filter(i => action.payload.ids.indexOf(i.id) === -1)
        }
      }
    }

    case t.CHANGE_FILEE_STATUS_FETCHING: {
      return {
        ...state,
        isFetching: action.payload
      }
    }

    case t.CHANGE_FILEE_STATUS_SUCCESS: {
      const payloadStatus = action.payload.status
      console.log(payloadStatus, 22222)
      const payloadId = action.payload.attachment_id
      const color = action.payload.color
      const name = action.payload.name
      console.log(payloadId, 3333)
      return {
        ...state,
        singleDocument: {
          ...state.singleDocument,
          document: {
            ...state.singleDocument.document,
            attachments: state.singleDocument.document.attachments.map(i => {
              // eslint-disable-next-line no-lone-blocks
              {
                if (i.id === payloadId) {
                  return {
                    ...i,
                    status: {
                      ...i.status,
                      status_data: {
                        ...i.status.status_data,
                        id: payloadStatus,
                        color: color,
                        name: name
                      }
                    }
                  }
                }
                return i
              }
            })
          }
        }
      }
    }
    default:
      return state
  }
}
