/* eslint-disable no-fallthrough */
import * as t from '../types'

import { api } from '../../services'

const createDocument = data => dispatch => {
  dispatch({
    type: t.CREATE_DOCUMENT_FETCHING,
    payload: true
  })
  return api.documents.createDocument(data)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.CREATE_DOCUMENT_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.CREATE_DOCUMENT_FETCHING,
        payload: false
      })
      return data
    })
}

const sendDocumentToUser = data => dispatch => {
  dispatch({
    type: t.CREATE_DOCUMENT_FETCHING,
    payload: true
  })
  return api.documents.sendDocumentToUser(data)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.SEND_DOCUMENT_TO_USER_SUCCESS,
          payload: false
        })
      }
      dispatch({
        type: t.CREATE_DOCUMENT_FETCHING,
        payload: false
      })
      return data
    })
}

const getDocumentsByActiveCompanyId = (id, params) => dispatch => {
  dispatch({
    type: t.GET_DOCUMENTS_BY_ACTIVE_COMPANY_ID_REQUEST_FETCHING,
    payload: {
      isFetching: true,
      data: {}
    }
  })
  return api.documents.getDocumentsByActiveCompanyId(id, params)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.GET_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.GET_DOCUMENTS_BY_ACTIVE_COMPANY_ID_REQUEST_SUCCESS,
        payload: false
      })
      return data
    })
}

const removeDocumentsByIds = ids => dispatch => {
  dispatch({
    type: t.REMOVE_DOCUMENTS_BY_IDS_FETCHING,
    payload: true
  })
  return api.documents.removeDocumentsByIds(ids)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.REMOVE_DOCUMENTS_BY_IDS_SUCCESS,
          payload: ids
        })
      }
      dispatch({
        type: t.REMOVE_DOCUMENTS_BY_IDS_FETCHING,
        payload: false
      })
      return data
    })
}

export {
  createDocument,
  sendDocumentToUser,
  getDocumentsByActiveCompanyId,
  removeDocumentsByIds
}
