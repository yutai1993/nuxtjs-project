export default ($axios, inject) => {
  inject('goodsDetail', {
    getGoodsDetail: (params = {}) => $axios.get('/goods/detail', {params})
  })
}
