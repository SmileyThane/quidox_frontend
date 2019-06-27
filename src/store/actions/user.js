import * as t from '../types'

import { api } from '../../services'

const getUser = () => dispatch => {
  dispatch({
    type: t.GET_USER_FETCHING,
    payload: true
  })
  return api.user.getUser()
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.GET_USER_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.GET_USER_FETCHING,
        payload: false
      })
      return data
    })
}

const updateUser = data => dispatch => {
  dispatch({
    type: t.UPDATE_USER_FETCHING,
    payload: true
  })
  return api.user.updateUser(data)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.UPDATE_USER_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.UPDATE_USER_FETCHING,
        payload: false
      })
    })
}

export {
  getUser,
  updateUser
}
