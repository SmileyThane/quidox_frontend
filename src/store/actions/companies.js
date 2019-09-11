import * as t from '../types'

import { api } from '../../services'

const getCompanies = () => dispatch => {
  dispatch({
    type: t.GET_COMPANIES_FETCHING,
    payload: true
  })
  return api.companies.getCompanies()
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: t.GET_COMPANIES_SUCCESS,
          payload: data
        })
      }
      dispatch({
        type: t.GET_COMPANIES_FETCHING,
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
  return api.companies.getCompanyById(id)
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
  return api.companies.changeActiveCompanyById(id)
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
  return api.companies.createCompany(body)
    .then(({ data }) => {
      console.log(data)
      if (data && data.success) {
        dispatch({
          type: t.CREATE_COMPANY_SUCCESS,
          payload: data
        })

        if (!state.companies.list.length) {
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
  getCompanies,
  getCompanyById,
  createCompany,
  changeActiveCompanyById
}
