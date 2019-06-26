import * as p from '../types'

import { api } from '../../services'

const getUser = () => dispatch => {
  dispatch({
    type: p.GET_USER_FETCHING,
    payload: true
  })
  return api.user.getUser()
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: p.GET_USER_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: p.GET_USER_FETCHING,
        payload: false
      })
      return data
    })
}

export {
  getUser
}
