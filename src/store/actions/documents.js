import {
  CREATE_DOCUMENT_FETHCING,
  CREATE_DOCUMENT_SUCCESS,
  SEND_DOCUMENT_TO_USER_FETCHING,
  SEND_DOCUMENT_TO_USER_SUCCESS,
  GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
  GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
  GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
  GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS
} from '../types'

import { api } from '../../services'

const createDocument = data => dispatch => {
  dispatch({
    type: CREATE_DOCUMENT_FETHCING,
    payload: true
  })
  return api.documents.createDocument(data)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: CREATE_DOCUMENT_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: CREATE_DOCUMENT_FETHCING,
        payload: false
      })
      return data
    })
}

const sendDocumentToUser = data => dispatch => {
  dispatch({
    type: SEND_DOCUMENT_TO_USER_FETCHING,
    payload: true
  })
  return api.documents.sendDocumentToUser(data)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: SEND_DOCUMENT_TO_USER_SUCCESS,
          payload: false
        })
      }
      dispatch({
        type: SEND_DOCUMENT_TO_USER_FETCHING,
        payload: false
      })
    })
}

const getOutDocumentsByActiveCompanyId = id => dispatch => {
  dispatch({
    type: GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.documents.getOutDocumentsByActiveCompanyId(id)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
        payload: false
      })
    })
}

const getDraftDocumentsByActiveCompany = id => dispatch => {
  dispatch({
    type: GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.documents.getDraftDocumentsByActiveCompany(id)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: GET_DRAFT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
        payload: false
      })
    })
}

export {
  createDocument,
  sendDocumentToUser,
  getOutDocumentsByActiveCompanyId,
  getDraftDocumentsByActiveCompany
}
