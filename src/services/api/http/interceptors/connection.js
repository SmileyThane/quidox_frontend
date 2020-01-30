export default (instance) => {
  instance.interceptors.response.use(null, err => {
    if (err.response && err.response.status === 401) {
      if (window.localStorage.getItem('authToken') !== null) {
        window.localStorage.clear('authToken')
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  })
}