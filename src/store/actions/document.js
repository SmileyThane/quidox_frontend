import * as t from '../types'

import { api } from '../../services'

const createMessage = data => dispatch => {
  dispatch({
    type: t.CREATE_MESSAGE_FETCHING,
    payload: true
  })
  return api.document.createDocument(data)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.CREATE_MESSAGE_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.CREATE_MESSAGE_FETCHING,
        payload: false
      })
      return data
    })
}

const getDocumentById = id => dispatch => {
  dispatch({
    type: t.GET_DOCUMENT_BY_ID_FETCHING,
    payload: true
  })
  return api.document.getDocumentById(id)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.GET_DOCUMENT_BY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.GET_DOCUMENT_BY_ID_FETCHING,
        payload: false
      })
    })
}

const updateDocumentById = (id, data) => dispatch => {
  dispatch({
    type: t.UPDATE_DOCUMENT_BY_ID_FETCHING,
    payload: true
  })
  return api.document.updateDocumentById(id, data)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.UPDATE_DOCUMENT_BY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.UPDATE_DOCUMENT_BY_ID_FETCHING,
        payload: false
      })
      return data
    })
}

const verifyDocument = data => dispatch => {
  dispatch({
    type: t.VERIFY_DOCUMENT_FETCHING,
    payload: true
  })
  return api.document.verifyDocument(data)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.VERIFY_DOCUMENT_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.VERIFY_DOCUMENT_FETCHING,
        payload: false
      })
      return data
    })
}

const changeStatus = status => dispatch => {
  dispatch({
    type: t.CHANGE_FILEE_STATUS_FETCHING,
    payload: true
  })
  return api.document.changeStatus(status)
    .then(data => {
      if (data) {
        dispatch({
          type: t.CHANGE_FILEE_STATUS_SUCCESS,
          payload: status
        })
      }
      dispatch({
        type: t.CHANGE_FILEE_STATUS_FETCHING,
        payload: false
      })
      return data
    })
}

const removeDocumentById = id => dispatch => {
  dispatch({
    type: t.REMOVE_DOCUMENT_BY_ID_FETCHING,
    payload: true
  })
  return api.document.removeDocumentById(id)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.REMOVE_DOCUMENT_BY_ID_SUCCESS,
          payload: id
        })
      }
      dispatch({
        type: t.REMOVE_DOCUMENT_BY_ID_FETCHING,
        payload: false
      })
      return data
    })
}

export {
  createMessage,
  getDocumentById,
  removeDocumentById,
  updateDocumentById,
  changeStatus,
  verifyDocument
}
