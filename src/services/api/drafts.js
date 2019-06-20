import http from './http'

const getDraftsByActiveCompany = id => {
  return http({
    url: `/documents/drafts/${id}`,
    method: 'GET'
  })
}

export {
  getDraftsByActiveCompany
}
