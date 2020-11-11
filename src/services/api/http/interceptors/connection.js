import history from '../../../../history'

export default (instance) => {
  instance.interceptors.response.use(null, err => {
    if (err.response && err.response.status === 401) {
      if (window.localStorage.getItem('authToken') !== null) {
        window.localStorage.clear('authToken')
        history.push('/login')
      }
    }
    return Promise.reject(err)
  })
}