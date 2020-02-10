function uploadReducer (state, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        isModalVisible: true,
        modalType: action.payload
      }
    case 'HIDE_MODAL':
      return {
        ...state,
        isModalVisible: false,
        isDisabled: false,
        isFilesUploaded: false,
        filesToUpload: []
      }
    case 'HANDLE_GET_FILES':
      return {
        ...state,
        filesToUpload: action.payload
      }
    case 'FILES_UPLOADED_STATUS':
      return {
        ...state,
        isDisabled: action.payload.disabled,
        isFilesUploaded: action.payload.uploaded_status
      }
  }
}

export {
  uploadReducer
}
