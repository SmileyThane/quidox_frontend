import {
  GET_COMPANY_FETCHING,
  GET_COMPANY_SUCCESS
} from '../types'

import { api } from '../../services'

const getCompany = () => dispatch => {
  dispatch({
    type: GET_COMPANY_FETCHING,
    payload: true
  })
  return api.company.getCompany()
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: GET_COMPANY_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: GET_COMPANY_FETCHING,
        payload: false
      })
      return data
    })
}

export {
  getCompany
}
