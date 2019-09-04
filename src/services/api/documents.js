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

const getInboxDocumentsByActiveCompanyId = (id, params) => {
  return http({
    url: `documents/in/0/${id}`,
    method: 'GET',
    params
  })
}

const getOutDocumentsByActiveCompanyId = (id, params) => {
  return http({
    url: `documents/out/0/${id}`,
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

const checkFlashKey = data => {
  return http({
    url: 'documents/sign/confirm',
    method: 'POST',
    data
  })
}

export {
  createDocument,
  sendDocumentToUser,
  getInboxDocumentsByActiveCompanyId,
  getOutDocumentsByActiveCompanyId,
  getDraftDocumentsByActiveCompany,
  removeDocumentsByIds,
  checkFlashKey
}
