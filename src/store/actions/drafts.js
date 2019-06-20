import {
  GET_DRAFTS_BY_ACTIVE_COMPANY_ID_FETCHING,
  GET_DRAFTS_BY_ACTIVE_COMPANY_ID_SUCCESS
} from '../types'

import { api } from '../../services'

const getDraftsByActiveCompany = id => dispatch => {
  dispatch({
    type: GET_DRAFTS_BY_ACTIVE_COMPANY_ID_FETCHING,
    payload: true
  })
  return api.drafts.getDraftsByActiveCompany(id)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: GET_DRAFTS_BY_ACTIVE_COMPANY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: GET_DRAFTS_BY_ACTIVE_COMPANY_ID_FETCHING,
        payload: false
      })
    })
}

export {
  getDraftsByActiveCompany
}
