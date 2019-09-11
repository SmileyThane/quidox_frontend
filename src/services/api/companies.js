import http from './http'

const getCompanies = () => {
  return http({
    url: 'companies',
    method: 'GET'
  })
}

const getCompanyById = id => {
  return http({
    url: `company/get/${id}`,
    method: 'GET'
  })
}

const changeActiveCompanyById = id => {
  return http({
    url: `/user/company/set/${id}`,
    method: 'GET'
  })
}

const createCompany = data => {
  return http({
    url: '/company/store',
    method: 'POST',
    data
  })
}

const attachUnregisteredUserToCompany = data => {
  return http({
    url: '/user/attach',
    method: 'POST',
    data
  })
}

export {
  getCompanies,
  getCompanyById,
  changeActiveCompanyById,
  createCompany,
  attachUnregisteredUserToCompany
}
