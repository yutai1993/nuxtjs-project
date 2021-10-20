export default ($axios, inject) => {
  inject('search', {
    getSearch: (params = {}) => $axios.get('/goods/qsearch', { params })
  })
}
