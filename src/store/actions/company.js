import * as t from '../types'

import { api } from '../../services'

const getCompany = () => dispatch => {
  dispatch({
    type: t.GET_COMPANY_FETCHING,
    payload: true
  })
  return api.company.getCompany()
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.GET_COMPANY_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.GET_COMPANY_FETCHING,
        payload: false
      })
      return data
    })
}

export {
  getCompany
}
