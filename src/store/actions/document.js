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
          console.log('data form action:', data)
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
  return api.document.removeDocumentById(id, type)
    .then(({ data }) => {
      if (data) {
        switch (type) {
          case 'draft':
            dispatch({
              type: t.REMOVE_DRAFT_DOCUMENT_BY_ID_SUCCESS,
              payload: id
            })
            break
          case 'out-confirmed':
            dispatch({
              type: t.REMOVE_OUT_CONFIRMED_DOCUMENT_BY_ID_SUCCESS,
              payload: id
            })
            break
          case 'out-unconfirmed':
            dispatch({
              type: t.REMOVE_OUT_UNCONFIRMED_DOCUMENT_BY_ID_SUCCESS,
              payload: id
            })
            break
          case 'unconfirmed':
            dispatch({
              type: t.REMOVE_INBOX_UNCONFIRMED_DOCUMENT_BY_ID_SUCCESS,
              payload: id
            })
            break
          case 'confirmed':
            dispatch({
              type: t.REMOVE_INBOX_CONFIRMED_DOCUMENT_BY_ID_SUCCESS,
              payload: id
            })
            break
          default:
        }
      }
      dispatch({
        type: t.REMOVE_DOCUMENT_BY_ID_FETCHING,
        payload: false
      })
    })
}

export {
  getDocumentById,
  removeDocumentById,
  updateDocumentById,
  verifyDocument
}
