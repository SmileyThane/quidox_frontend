import axios from 'axios'

// import { config } from '../../../constants'

import {
  token
} from './interceptors'

const instance = axios.create({
  baseURL: 'http://192.168.88.125/quidox/public/api/',
  headers: {},
  data: {},
  timeout: 180000
})
token(instance)

export default instance
