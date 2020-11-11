export default (instance) => {
  instance.interceptors.response.use(response => {
    return Promise.resolve(response)
  }, error => {
    return Promise.reject(error)
  })
}
