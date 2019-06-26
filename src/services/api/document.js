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

export {
  getDocumentById,
  removeDocumentById
}
