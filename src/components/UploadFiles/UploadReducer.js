function uploadReducer (state, action) {
  switch (action.type) {
    case 'SHOW_UPLOAD_MODAL':
      return {
        ...state,
        isModalVisible: true
      }
    case 'HIDE_UPLOAD_MODAL':
      return {
        ...state,
        isModalVisible: false,
        filesToUpload: []
      }
    case 'HANDLE_GET_FILES':
      return {
        ...state,
        filesToUpload: action.payload
      }
  }
}

export {
  uploadReducer
}
