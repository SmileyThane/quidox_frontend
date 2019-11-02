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

const getDocumentsByActiveCompanyId = (id, params) => {
  return http({
    url: `documents/show/${id}`,
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

const attachmentSignCanConfirm = data => {
  return http({
    url: 'attachment/sign/can_confirm',
    method: 'POST',
    data
  })
}

const getDocumentsStatuses = () => {
  return http({
    url: '/documents_statuses',
    method: 'GET'
  })
}

export {
  createDocument,
  sendDocumentToUser,
  getDocumentsByActiveCompanyId,
  removeDocumentsByIds,
  attachmentSignCanConfirm,
  getDocumentsStatuses
}
