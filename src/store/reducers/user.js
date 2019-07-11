import * as t from '../types'

const initialState = {
  data: {},
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.GET_USER_FETCHING: {
      return {
        ...state,
        isFetching: action.payload
      }
    }
    case t.GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload.data
      }
    }
    case t.UPDATE_USER_FETCHING: {
      return {
        ...state,
        isFetching: action.payload
      }
    }
    case t.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload.data
      }
    }
    case t.CHANGE_ACTIVE_COMPANY_BY_ID_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          active_company_id: action.payload
        }
      }
    }
    default:
      return state
  }
}
