export default (instance) => {
  instance.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')
    // console.log(token)
    const accessToken = 'Bearer ' + token
    // console.log(accessToken)
    if (accessToken) {
      console.log('Auth attached')
      config.headers.Authorization = accessToken
      return Promise.resolve(config)
    } else {
      return new Error('Unauthorized')
    }
  })
}