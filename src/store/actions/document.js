import {
  CREATE_DOCUMENT_FETHCING,
  CREATE_DOCUMENT_SUCCESS
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

export {
  createDocument
}
