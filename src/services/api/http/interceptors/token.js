export default (instance) => {
  instance.interceptors.request.use(function (config) {
    const accessToken = window.localStorage.getItem('authToken')
    const sessionToken = window.sessionStorage.getItem('authToken')
    if (accessToken !== null) {
      console.log('accessToken')
      config.headers.Authorization = 'Bearer ' + accessToken
      return Promise.resolve(config)
    } else if (sessionToken !== null) {
      console.log('sessionToken')
      config.headers.Authorization = 'Bearer ' + sessionToken
      return Promise.resolve(config)
    } else {
      return new Error('Unauthorized')
    }
  })
}