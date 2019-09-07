import * as t from '../types'

const initalState = {
  list: [],
  singleCompany: {},
  isFetching: false
}

export default (state = initalState, action) => {
  switch (action.type) {
    case t.GET_COMPANY_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_COMPANY_SUCCESS:
      return {
        ...state,
        list: action.payload.data
      }
    case t.GET_COMPANY_BY_ID_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.GET_COMPANY_BY_ID_SUCCESS:
      return {
        ...state,
        singleCompany: action.payload
      }
    case t.CREATE_COMPANY_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case t.CREATE_COMPANY_SUCCESS:
      const res = action.payload.data
      console.log('data:', res)
      return {
        ...state,
        list: [...state.list, { id: res.id, company_data: res }]
      }
    default:
      return state
  }
}
