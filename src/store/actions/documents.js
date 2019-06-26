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
    })
}

const getInboxUnconfirmedDocumentsByActiveCompanyId = id => dispatch => {
  dispatch({
    type: t.GET_INBOX_UNCONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.documents.getInboxUnconfirmedDocumentsByActiveCompanyId(id)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.GET_INBOX_UNCONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.GET_INBOX_UNCONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
        payload: false
      })
    })
}

const getInboxСonfirmedDocumentsByActiveCompanyId = id => dipsatch => {
  dipsatch({
    type: t.GET_INBOX_CONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.documents.getInboxСonfirmedDocumentsByActiveCompanyId(id)
    .then(({ data }) => {
      if (data) {
        dipsatch({
          type: t.GET_INBOX_CONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
          payload: data
        })
      }
      dipsatch({
        type: t.GET_INBOX_CONFIRMED_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
        payload: false
      })
    })
}

const getOutDocumentsByActiveCompanyId = id => dispatch => {
  dispatch({
    type: t.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.documents.getOutDocumentsByActiveCompanyId(id)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
        payload: false
      })
    })
}

const getDraftDocumentsByActiveCompany = id => dispatch => {
  dispatch({
    type: t.GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.documents.getDraftDocumentsByActiveCompany(id)
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

export {
  createDocument,
  sendDocumentToUser,
  getInboxUnconfirmedDocumentsByActiveCompanyId,
  getInboxСonfirmedDocumentsByActiveCompanyId,
  getOutDocumentsByActiveCompanyId,
  getDraftDocumentsByActiveCompany
}
