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

const getInboxUnconfirmedDocumentsByActiveCompanyId = (id, params) => {
  return http({
    url: `documents/in/0/${id}`,
    method: 'GET',
    params
  })
}

const getInboxСonfirmedDocumentsByActiveCompanyId = (id, params) => {
  return http({
    url: `documents/in/1/${id}`,
    method: 'GET',
    params
  })
}

const getOutDocumentsByActiveCompanyId = (id, params) => {
  return http({
    url: `/documents/out/${id}`,
    method: 'GET',
    params
  })
}

const getDraftDocumentsByActiveCompany = (id, params) => {
  return http({
    url: `/documents/drafts/${id}`,
    method: 'GET',
    params
  })
}

const removeDocumentsByIds = data => {
  return http({
    url: `document/multiple/delete`,
    method: 'POST',
    data
  })
}

export {
  createDocument,
  sendDocumentToUser,
  getInboxUnconfirmedDocumentsByActiveCompanyId,
  getInboxСonfirmedDocumentsByActiveCompanyId,
  getOutDocumentsByActiveCompanyId,
  getDraftDocumentsByActiveCompany,
  removeDocumentsByIds
}
