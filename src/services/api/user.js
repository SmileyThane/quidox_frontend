import http from './http'

const getUser = () => {
  return http({
    url: 'user',
    method: 'GET'
  })
}

const getSharedUsers = () => {
  return http({
    url: '/user/shared',
    method: 'GET'
  })
}

const userLogout = () => {
  return http({
    url: 'logout',
    method: 'POST'
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

const shareUser = data => {
  return http({
    url: '/user/share',
    method: 'POST',
    data
  })
}

const getSharedUser = data => {
  return http({
    url: '/user/shared/token/get',
    method: 'POST',
    data
  })
}

const getTariffications = () => {
  return http({
    url: '/tarifications',
    method: 'GET'
  })
}

const changeTariff = data => {
  return http({
    url: '/tarification/add',
    method: 'POST',
    data
  })
}

const loginByEsign = data => {
  return http({
    url: '/esign/login',
    method: 'POST',
    data
  })
}

export {
  getUser,
  shareUser,
  getSharedUser,
  getSharedUsers,
  userLogout,
  updateUser,
  findUsersByParams,
  getTariffications,
  changeTariff,
  loginByEsign
}
