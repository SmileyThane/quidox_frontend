import http from './http'

const getConfig = () => {
  return http({
    url: 'config/check',
    method: 'GET'
  })
}

export {
  getConfig
}
