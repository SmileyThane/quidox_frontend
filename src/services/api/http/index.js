import axios from 'axios'

// import { config } from '../../../constants'

import {
  token
} from './interceptors'

const instance = axios.create({
  baseURL: 'http://178.172.173.203/api',
  headers: {},
  data: {},
  timeout: 180000
})
token(instance)

export default instance
