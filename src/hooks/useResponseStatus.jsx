import react from 'react'
import instance from '../services/api/http'

export default function useResponseStatus () {
  const [status, setStatus] = react.useState(null)

  instance.interceptors.response.use(function (response) {
    setStatus(response.status)
    return response
  }, function (error) {
    setStatus(error.status)
    return Promise.reject(error)
  })
  return {
    status
  }
}
