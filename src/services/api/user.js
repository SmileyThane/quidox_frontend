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

export {
  getUser,
  findUsersByParams
}
