export default (instance) => {
  instance.interceptors.request.use(function (config) {
    const accessToken = window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken
      return Promise.resolve(config)
    } else {
      return new Error('Unauthorized')
    }
  })
}