/* eslint-disable no-fallthrough */
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
          case 'out':
            dispatch({
              type: t.REMOVE_OUT_DOCUMENT_BY_ID_SUCCESS,
              payload: id
            })
          case 'unconfirmed':
            dispatch({
              type: t.REMOVE_INBOX_UNCONFIRMED_DOCUMENT_BY_ID_SUCCESS,
              payload: id
            })
          case 'confirmed':
            dispatch({
              type: t.REMOVE_INBOX_CONFIRMED_DOCUMENT_BY_ID_SUCCESS,
              payload: id
            })
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
  removeDocumentById
}
