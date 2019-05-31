import http from './http'

const getCompany = () => {
  return http({
    url: 'companies',
    method: 'GET'
  })
}

export {
  getCompany
}
