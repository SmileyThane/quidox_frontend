import axios from 'axios'

// import { config } from '../../../constants'

import {
  token
} from './interceptors'

const instance = axios.create({
  baseURL: 'https://api.quidox.by/api',
  headers: {},
  data: {},
  timeout: 180000
})
token(instance)

export default instance
