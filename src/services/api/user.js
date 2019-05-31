import http from './http'

const getUser = () => {
  return http({
    url: 'user',
    method: 'GET'
  })
}

export {
  getUser
}
