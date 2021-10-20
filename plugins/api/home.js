
export default ($axios, inject) => {
  inject('home', {
    /* 轮播 */
    getSwiper: (params = {}) => $axios.get('/home/swiperdata', { params }),
    /* 导航 */
    getNavigation: (params = {}) => $axios.get('/home/catitems', { params }),
    /* 楼层 */
    getBuilding: (params = {}) => $axios.get('/home/floordata', { params })
  })
}


