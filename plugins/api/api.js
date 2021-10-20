import home from '~/plugins/api/home'
import category from '~/plugins/api/category'
import search from '@/plugins/api/search'
import goodsList from '@/plugins/api/goodsList'
import goodsDetail from '@/plugins/api/goodsDetail'
export default ({ $axios }, inject) => {
  home($axios, inject)
  category($axios, inject)
  search($axios, inject)
  goodsList($axios, inject)
  goodsDetail($axios, inject)
}

