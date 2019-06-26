import * as p from '../types'

import { api } from '../../services'

const getCompany = () => dispatch => {
  dispatch({
    type: p.GET_COMPANY_FETCHING,
    payload: true
  })
  return api.company.getCompany()
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: p.GET_COMPANY_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: p.GET_COMPANY_FETCHING,
        payload: false
      })
      return data
    })
}

export {
  getCompany
}
