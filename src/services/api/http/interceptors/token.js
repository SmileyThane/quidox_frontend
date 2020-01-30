export default (instance) => {
  instance.interceptors.request.use(function (config) {
    let authToken = window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')
    if (authToken) {
      config.headers.Authorization = 'Bearer ' + authToken
      return Promise.resolve(config)
    } else {
      return new Error('Unauthorized')
    }
  })
}
