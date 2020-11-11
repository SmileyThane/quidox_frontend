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

        dispatch({
          type: t.GET_CONFIG_SUCCESS,
          payload: { co_brand_config: data.data.co_brand_config }
        })
      }
      dispatch({
        type: t.GET_USER_FETCHING,
        payload: false
      })
      return data
    })
}

const userLogout = () => dispatch => {
  return api.user.userLogout()
    .then(data => {
      if (data) {
        dispatch({
          type: t.USER_LOGOUT,
          payload: null
        })
      }
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
      if (data.success) {
        dispatch({
          type: t.UPDATE_USER_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.UPDATE_USER_FETCHING,
        payload: false
      })
      return data
    })
}

const shareUser = data => dispatch => {
  dispatch({
    type: t.UPDATE_USER_FETCHING,
    payload: true
  })
  return api.user.shareUser(data)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: t.UPDATE_USER_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.UPDATE_USER_FETCHING,
        payload: false
      })
      return data
    })
}

const getSharedUser = data => dispatch => {
  dispatch({
    type: t.UPDATE_USER_FETCHING,
    payload: true
  })
  return api.user.getSharedUser(data)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: t.UPDATE_USER_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.UPDATE_USER_FETCHING,
        payload: false
      })
      return data
    })
}

const getTariffications = () => dispatch => {
  dispatch({
    type: t.GET_TARIFF_FETCHING,
    payload: true
  })
  return api.user.getTariffications()
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: t.GET_TARIFF_SUCCESS,
          payload: data.data
        })
        dispatch({
          type: t.GET_TARIFF_FETCHING,
          payload: false
        })
      } else {
        dispatch({
          type: t.GET_TARIFF_FETCHING,
          payload: false
        })
      }
    })
}

export {
  getUser,
  shareUser,
  getSharedUser,
  userLogout,
  updateUser,
  getTariffications
}
