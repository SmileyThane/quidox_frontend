import * as t from '../types'

const initialState = {
  list: [],
  isFetching: false,
  status: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.GET_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        list: action.payload.data.document.attachments
      }
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
    case t.VERIFY_FILE_STATUS:
      return {
        ...state,
        status: action.payload
      }
    case t.VERIFY_FILE_SUCCESS:
      const index = state.list.findIndex(i => i.id === action.payload.data.id)
      return {
        ...state,
        list: [
          ...state.list.slice(0, index),
          action.payload.data,
          ...state.list.slice(index + 1)
        ]
      }
    case t.VERIFY_FILE_TZI:
      let file = state.list[state.list.findIndex(i => i.id === action.payload.fileId)]
      const updatedFile = { ...file, users_companies: [...file.users_companies, action.payload.sign] }
      return {
        ...state,
        list: [
          ...state.list.slice(0, state.list.findIndex(i => i.id === action.payload.fileId)),
          updatedFile,
          ...state.list.slice(state.list.findIndex(i => i.id === action.payload.fileId) + 1)
        ]
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
