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

const getInboxDocumentsByActiveCompanyId = (id, params) => dispatch => {
  dispatch({
    type: t.GET_INBOX_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.documents.getInboxDocumentsByActiveCompanyId(id, params)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.GET_INBOX_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.GET_INBOX_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
        payload: false
      })
    })
}

const getOutDocumentsByActiveCompanyId = (id, params) => dipsatch => {
  dipsatch({
    type: t.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.documents.getOutDocumentsByActiveCompanyId(id, params)
    .then(({ data }) => {
      if (data) {
        dipsatch({
          type: t.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
          payload: data
        })
      }
      dipsatch({
        type: t.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
        payload: false
      })
    })
}

const getDraftDocumentsByActiveCompany = (id, params) => dispatch => {
  dispatch({
    type: t.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.documents.getDraftDocumentsByActiveCompany(id, params)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
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
          case 'out-confirmed':
            dispatch({
              type: t.REMOVE_OUT_CONFIRMED_DOCUMENTS_BY_IDS_SUCCESS,
              payload: ids
            })
            break
          case 'out-unconfirmed':
            dispatch({
              type: t.REMOVE_OUT_UNCONFIRMED_DOCUMENTS_BY_IDS_SUCCESS,
              payload: ids
            })
            break
          case 'unconfirmed':
            dispatch({
              type: t.REMOVE_INBOX_UNCONFIRMED_DOCUMENTS_BY_IDS_SUCCESS,
              payload: ids
            })
            break
          case 'confirmed':
            dispatch({
              type: t.REMOVE_INBOX_CONFIRMED_DOCUMENTS_BY_IDS_SUCCESS,
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
  getInboxDocumentsByActiveCompanyId,
  getOutDocumentsByActiveCompanyId,
  getDraftDocumentsByActiveCompany,
  removeDocumentsByIds
}
