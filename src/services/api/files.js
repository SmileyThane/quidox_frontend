import http from './http'

const uploadFile = (data, headers) => {
  return http({
    url: '/document/attachment/create',
    method: 'POST',
    data,
    headers
  })
}

const removeFile = id => {
  return http({
    url: `/attachment/delete/${id}`,
    method: 'GET'
  })
}

const getBase64File = id => {
  return http({
    url: `/attachment/data/base64/${id}`,
    method: 'GET'
  })
}

const verifyFile = data => {
  return http({
    url: 'documents/confirm',
    method: 'POST',
    data
  })
}

const changeFileStatus = data => {
  return http({
    url: 'attachment/status/update',
    method: 'POST',
    data
  })
}

export {
  uploadFile,
  removeFile,
  verifyFile,
  changeFileStatus,
  getBase64File
}
