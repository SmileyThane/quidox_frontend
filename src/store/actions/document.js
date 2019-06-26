import * as p from '../types'

import { api } from '../../services'

const getDocumentById = id => dispatch => {
  dispatch({
    type: p.GET_DOCUMENT_BY_ID_FETCHING,
    payload: true
  })
  return api.document.getDocumentById(id)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: p.GET_DOCUMENT_BY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: p.GET_DOCUMENT_BY_ID_FETCHING,
        payload: false
      })
    })
}

export {
  getDocumentById
}
