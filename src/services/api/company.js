import http from './http'

const getCompany = () => {
  return http({
    url: 'companies',
    method: 'GET'
  })
}

const changeActiveCompanyById = id => {
  return http({
    url: `/user/company/set/${id}`,
    method: 'GET'
  })
}

export {
  getCompany,
  changeActiveCompanyById
}
