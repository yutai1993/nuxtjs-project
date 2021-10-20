export default ($axios, inject) => {
  inject('category', {
    getCategory: (params = {}) => $axios.get('/categories', params)
  })
}
