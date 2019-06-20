import http from './http'

const createDocument = data => {
  return http({
    url: 'document/create',
    method: 'POST',
    data
  })
}

const getOutDocumentsByActiveCompanyId = id => {
  return http({
    url: `/documents/out/${id}`,
    method: 'GET'
  })
}

export {
  createDocument,
  getOutDocumentsByActiveCompanyId
}
