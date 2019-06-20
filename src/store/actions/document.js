import {
  CREATE_DOCUMENT_FETHCING,
  CREATE_DOCUMENT_SUCCESS,
  GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
  GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_SUCCESS
} from '../types'

import { api } from '../../services'

const createDocument = data => dispatch => {
  dispatch({
    type: CREATE_DOCUMENT_FETHCING,
    payload: true
  })
  return api.document.createDocument(data)
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
    })
}

const getOutDocumentsByActiveCompanyId = id => dispatch => {
  dispatch({
    type: GET_OUT_DOCUMENTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.document.getOutDocumentsByActiveCompanyId(id)
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

export {
  createDocument,
  getOutDocumentsByActiveCompanyId
}
