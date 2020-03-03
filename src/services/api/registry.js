import http from './http'

const importRegistry = (data, headers) => {
  return http({
    url: '/registry/import',
    method: 'POST',
    data,
    headers
  })
}

const   importStoredRegistry = () => {
  return http({
    url: '/registry/stored',
    method: 'GET',
  })
}

export {
  importRegistry,
  importStoredRegistry
}
