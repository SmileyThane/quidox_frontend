import * as t from '../types'

import { api } from '../../services'

const getConfig = () => dispatch => {
  dispatch({
    type: t.GET_CONFIG_REQUEST,
    payload: true
  })

  return api.config.getConfig()
    .then(response => {

      dispatch({
        type: t.GET_CONFIG_SUCCESS,
        payload: { co_brand_config: response.data }
      })

      dispatch({
        type: t.GET_CONFIG_REQUEST,
        payload: false
      })
    })
}

export {
  getConfig
}