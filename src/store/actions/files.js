import * as t from '../types'

import { api } from '../../services'

const uploadFile = (data, headers) => dispatch => {
  dispatch({
    type: t.UPLOAD_FILE_FETCHING,
    payload: true
  })
  return api.files.uploadFile(data, headers)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: t.UPLOAD_FILE_SUCCESS,
          payload: data
        })
      } else {
        dispatch({
          type: t.UPLOAD_FILE_STATUS,
          payload: data.error
        })
      }
      dispatch({
        type: t.UPLOAD_FILE_FETCHING,
        payload: false
      })
      return data
    })
}

const removeFile = id => dispatch => {
  dispatch({
    type: t.REMOVE_FILE_FETCHING,
    payload: true
  })
  return api.files.removeFile(id)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.REMOVE_FILE_SUCCESS,
          payload: id
        })
      }
      dispatch({
        type: t.REMOVE_FILE_FETCHING,
        payload: false
      })
      return data
    })
}

const verifyFile = body => dispatch => {
  dispatch({
    type: t.VERIFY_FILE_FETCHING,
    payload: true
  })
  return api.files.verifyFile(body)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: t.VERIFY_FILE_SUCCESS,
          payload: data
        })
      } else {
        dispatch({
          type: t.VERIFY_FILE_STATUS,
          payload: data.error
        })
      }
      dispatch({
        type: t.VERIFY_FILE_STATUS,
        payload: data.success
      })
      dispatch({
        type: t.VERIFY_FILE_FETCHING,
        payload: false
      })
      return data
    })
}

const verifyFileTZI = (fileId, sign) => dispatch => {
  console.log(fileId)
  console.log(sign)
  dispatch({
    type: t.VERIFY_FILE_TZI,
    payload: {
      fileId,
      sign
    }
  })

}

const changeFileStatus = body => dispatch => {
  dispatch({
    type: t.CHANGE_FILE_STATUS_FETCHING,
    payload: true
  })
  return api.files.changeFileStatus(body)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.CHANGE_FILE_STATUS_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.CHANGE_FILE_STATUS_FETCHING,
        payload: false
      })
      return data
    })
}

export {
  uploadFile,
  removeFile,
  verifyFile,
  verifyFileTZI,
  changeFileStatus
}
