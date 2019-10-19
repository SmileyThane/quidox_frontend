import http from './http'

const getDocumentById = id => {
  return http({
    url: `documents/${id}`,
    method: 'GET'
  })
}

const createDocument = (data, headers) => {
  return http({
    url: 'document/create',
    method: 'POST',
    data,
    headers
  })
}

const confirmDocument = data => {
  return http({
    url: 'documents/confirm',
    method: 'POST',
    data
  })
}

const removeDocumentById = id => {
  return http({
    url: `/document/delete/${id}`,
    method: 'GET'
  })
}

const downloadDocument = (id, withCert) => {
  return http({
    url: `/document/zip/${id}/${withCert}`,
    method: 'GET'
  })
}

const downloadReciept = id => {
  return http({
    url: `/receipt/pdf/${id}`,
    method: 'GET'
  })
}

const verifyDocument = data => {
  return http({
    url: 'documents/confirm',
    method: 'POST',
    data
  })
}

const changeStatus = data => {
  return http({
    url: 'attachment/status/update',
    method: 'POST',
    data
  })
}

const updateDocumentById = (id, data) => {
  return http({
    url: `document/update/${id}`,
    method: 'POST',
    data
  })
}

export {
  getDocumentById,
  createDocument,
  confirmDocument,
  removeDocumentById,
  downloadDocument,
  verifyDocument,
  changeStatus,
  updateDocumentById,
  downloadReciept
}
