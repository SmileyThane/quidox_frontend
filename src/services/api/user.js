import http from './http'

const getUser = () => {
  return http({
    url: 'user',
    method: 'GET'
  })
}

const findUsersByParams = params => {
  return http({
    url: `user/company/find/${params}`,
    method: 'GET'
  })
}

const updateUser = data => {
  return http({
    url: 'user/update',
    method: 'POST',
    data
  })
}

export {
  getUser,
  updateUser,
  findUsersByParams
}
