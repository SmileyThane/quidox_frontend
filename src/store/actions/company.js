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

const getCompanyById = id => dispatch => {
  dispatch({
    type: t.GET_COMPANY_BY_ID_FETCHING,
    payload: true
  })
  return api.company.getCompanyById(id)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.GET_COMPANY_BY_ID_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.GET_COMPANY_BY_ID_FETCHING,
        payload: false
      })
    })
}

const changeActiveCompanyById = id => dispatch => {
  dispatch({
    type: t.CHANGE_ACTIVE_COMPANY_BY_ID_FETCHING,
    payload: true
  })
  return api.company.changeActiveCompanyById(id)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: t.CHANGE_ACTIVE_COMPANY_BY_ID_SUCCESS,
          payload: id
        })
      }
      dispatch({
        type: t.CHANGE_ACTIVE_COMPANY_BY_ID_FETCHING,
        payload: false
      })
    })
}

const createCompany = body => (dispatch, getState) => {
  const state = getState()
  dispatch({
    type: t.CREATE_COMPANY_FETCHING,
    payload: true
  })
  return api.company.createCompany(body)
    .then(({ data }) => {
      console.log(data)
      if (data && data.success) {
        dispatch({
          type: t.CREATE_COMPANY_SUCCESS,
          payload: data
        })

        if (!state.company.list.length) {
          dispatch({
            type: t.CHANGE_ACTIVE_COMPANY_BY_ID_SUCCESS,
            payload: data.data.id
          })
        }
      } else {
        dispatch({
          type: t.CREATE_COMPANY_FETCHING,
          payload: false
        })
        throw Error(data.error)
      }
      dispatch({
        type: t.CREATE_COMPANY_FETCHING,
        payload: false
      })
      return data
    })
}

export {
  getCompany,
  getCompanyById,
  createCompany,
  changeActiveCompanyById
}
