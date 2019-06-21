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

const getInboxUnconfirmedDocumentsByActiveCompanyId = id => {
  return http({
    url: `documents/in/0/${id}`,
    method: 'GET'
  })
}

const getInboxСonfirmedDocumentsByActiveCompanyId = id => {
  return http({
    url: `documents/in/1/${id}`,
    method: 'GET'
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
  getInboxUnconfirmedDocumentsByActiveCompanyId,
  getInboxСonfirmedDocumentsByActiveCompanyId,
  getOutDocumentsByActiveCompanyId,
  getDraftDocumentsByActiveCompany
}
