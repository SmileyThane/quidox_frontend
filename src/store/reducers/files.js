import * as t from '../types'

const initialState = {
  list: [],
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.CREATE_MESSAGE_FETCHING:
      return {
        ...state,
        list: []
      }
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
      const fileIndex = state.list.findIndex(i => i.id === action.payload.data.id)
      return {
        ...state,
        list: [
          ...state.list.slice(0, fileIndex),
          action.payload.data,
          ...state.list.slice(fileIndex + 1)
        ]
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
