export default (instance) => {
  instance.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')
    const accessToken = 'Bearer ' + token
    if (token) {
      config.headers.Authorization = accessToken
      return Promise.resolve(config)
    } else {
      return new Error('Unauthorized')
    }
  })
}