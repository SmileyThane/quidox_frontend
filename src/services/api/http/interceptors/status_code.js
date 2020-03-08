export default (instance) => {
  instance.interceptors.response.use(response => {
    console.log(response.status)
    return Promise.resolve(response)
  }, error => {
    return Promise.reject(error)
  })
}
