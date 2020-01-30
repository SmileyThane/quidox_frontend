export default (instance) => {
  instance.interceptors.request.use(function (config) {
    if (window.localStorage.getItem('authToken')) {
      config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('authToken')
      return Promise.resolve(config)
    } else {
      return new Error('Unauthorized')
    }
  })
}
