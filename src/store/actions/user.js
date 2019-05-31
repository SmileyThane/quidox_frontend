import {
  GET_USER_FETCHING,
  GET_USER_SUCCESS
} from '../types'

import { api } from '../../services'

const getUser = () => dispatch => {
  dispatch({
    type: GET_USER_FETCHING,
    payload: true
  })
  return api.user.getUser()
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: GET_USER_FETCHING,
        paylod: false
      })
      return data
    })
}

export {
  getUser
}
