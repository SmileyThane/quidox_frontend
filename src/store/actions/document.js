import * as t from '../types'

import { api } from '../../services'

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

const removeDocumentById = (id, type) => dispatch => {
  dispatch({
    type: t.REMOVE_DOCUMENT_BY_ID_FETCHING,
    payload: true
  })
  console.log('type:', type)
  return api.document.removeDocumentById(id, type)
    .then(({ data }) => {
      switch (type) {
        case 'draft':
          dispatch({
            type: t.REMOVE_DRAFT_DOCUMENT_BY_ID_SUCCESS,
            payload: id
          })
          break
        case 'inbox':
          dispatch({
            type: t.REMOVE_INBOX_DOCUMENT_BY_ID_SUCCESS,
            payload: id
          })
          break
        case 'out':
          dispatch({
            type: t.GET_DOCUMENT_BY_ID_SUCCESS,
            payload: id
          })
          break
        case 'archive':
          dispatch({
            type: t.GET_DOCUMENT_BY_ID_SUCCESS,
            payload: id
          })
          break
        default:
      }
      dispatch({
        type: t.REMOVE_DOCUMENT_BY_ID_FETCHING,
        payload: false
      })
      return data
    })
}

export {
  getDocumentById,
  removeDocumentById,
  updateDocumentById,
  verifyDocument
}
