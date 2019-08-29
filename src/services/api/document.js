import http from './http'

const getDocumentById = id => {
  return http({
    url: `documents/${id}`,
    method: 'GET'
  })
}

const removeDocumentById = (id, type) => {
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

const verifyDocument = data => {
  return http({
    url: 'documents/confirm',
    method: 'POST',
    data
  })
}

export {
  getDocumentById,
  removeDocumentById,
  downloadDocument,
  verifyDocument
}
