export default ($axios, inject) => {
  inject('goodsList', {
    getGoods: (params = {}) => $axios.get('/goods/search', { params })
  })
}
