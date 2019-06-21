import http from './http'

const createDocument = data => {
  return http({
    url: 'document/create',
    method: 'POST',
    data
  })
}

const sendDocumentToUser = data => {
  return http({
    url: 'documents/send',
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

const getDraftDocumentsByActiveCompany = id => {
  return http({
    url: `/documents/drafts/${id}`,
    method: 'GET'
  })
}

export {
  createDocument,
  sendDocumentToUser,
  getOutDocumentsByActiveCompanyId,
  getDraftDocumentsByActiveCompany
}
