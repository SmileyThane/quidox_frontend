import http from './http'

const createDocument = data => {
  return http({
    url: 'document/create',
    method: 'POST',
    data
  })
}

export {
  createDocument
}