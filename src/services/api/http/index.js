import axios from 'axios'

// import { config } from '../../../constants'

import {
  token,
  connection,
  status_code
} from './interceptors'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'X-Frame-Options': 'sameorigin',
    'Access-Control-Allow-Origin': '*'
  },
  // data: {},
  timeout: 180000
})
token(instance)
// status_code(instance)
connection(instance)

export default instance
