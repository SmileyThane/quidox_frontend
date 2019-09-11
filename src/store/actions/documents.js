/* eslint-disable no-fallthrough */
import * as t from '../types'

import { api } from '../../services'

const createDocument = data => dispatch => {
  dispatch({
    type: t.CREATE_DOCUMENT_FETHCING,
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
        type: t.CREATE_DOCUMENT_FETHCING,
        payload: false
      })
      return data
    })
}

const sendDocumentToUser = data => dispatch => {
  dispatch({
    type: t.CREATE_DOCUMENT_FETHCING,
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
        type: t.CREATE_DOCUMENT_FETHCING,
        payload: false
      })
      return data
    })
}

const getDocumentsByActiveCompanyId = (id, params) => dispatch => {
  dispatch({
    type: t.GET_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.documents.getDocumentsByActiveCompanyId(id, params)
    .then(({ data }) => {
      if (data) {
        switch (params.status) {
          case 1:
            dispatch({
              type: t.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
              payload: data
            })
            break
          case 2:
            dispatch({
              type: t.GET_INBOX_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
              payload: data
            })
            break
          case 3:
            dispatch({
              type: t.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
              payload: data
            })
            break
          case 4:
            dispatch({
              type: t.GET_ARCHIVE_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
              payload: data
            })
            break
          default:
        }
      }
      dispatch({
        type: t.GET_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
        payload: false
      })
    })
}


const removeDocumentsByIds = (ids, type) => dispatch => {
  dispatch({
    type: t.REMOVE_DOCUMENTS_BY_IDS_FETCHING,
    payload: true
  })
  return api.documents.removeDocumentsByIds(ids)
    .then(({ data }) => {
      if (data) {
        switch (type) {
          case 'draft':
            dispatch({
              type: t.REMOVE_DRAFT_DOCUMENTS_BY_IDS_SUCCESS,
              payload: ids
            })
            break
          case 'inbox':
            dispatch({
              type: t.REMOVE_INBOX_DOCUMENTS_BY_IDS_SUCCESS,
              payload: ids
            })
            break
          case 'out':
            dispatch({
              type: t.REMOVE_OUT_DOCUMENTS_BY_IDS_SUCCESS,
              payload: ids
            })
            break
          case 'archive':
            dispatch({
              type: t.REMOVE_OUT_DOCUMENTS_BY_IDS_SUCCESS,
              payload: ids
            })
            break
          default:
        }
      }
      dispatch({
        type: t.REMOVE_DOCUMENTS_BY_IDS_FETCHING,
        payload: false
      })
    })
}

export {
  createDocument,
  sendDocumentToUser,
  getDocumentsByActiveCompanyId,
  removeDocumentsByIds
}
