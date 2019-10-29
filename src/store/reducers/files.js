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
          { fetching: false, ...action.payload.data }
        ]
      }
    case t.VERIFY_FILE_SUCCESS:
      console.log('action:', action.payload)
      return {
        ...state,
        list: state.list.map(i => {
          // eslint-disable-next-line no-lone-blocks
          {
            if (i.id === action.payload.documents[0].attachments[0].id) {
              return {
                ...i,
                verification_info: action.payload.documents[0].attachments[0].data
              }
            }
            return i
          }
        })
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
    case t.CHANGE_FILE_STATUS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.CHANGE_FILE_STATUS_SUCCESS:
      return {
        ...state,
        list: state.list.map(i => {
          // eslint-disable-next-line no-lone-blocks
          {
            if (i.id === action.payload.attachment_id) {
              return {
                ...i,
                status: {
                  ...i.status,
                  status_data: {
                    ...i.status.status_data,
                    id: action.payload.status
                  }
                }
              }
            }
            return i
          }
        })
      }
    case t.SEND_DOCUMENT_TO_USER_SUCCESS:
      return {
        ...state,
        list: []
      }
    default:
      return state
  }
}
