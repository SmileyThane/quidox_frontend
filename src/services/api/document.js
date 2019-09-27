import http from './http'

const getDocumentById = id => {
  return http({
    url: `documents/${id}`,
    method: 'GET'
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

const agreeFile = data => {
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
  removeDocumentById,
  downloadDocument,
  verifyDocument,
  agreeFile,
  updateDocumentById,
  downloadReciept
}
