import http from './http'

const importRegistry = (data, headers) => {
  return http({
    url: '/registry/import',
    method: 'POST',
    data,
    headers
  })
}

export {
  importRegistry
}
