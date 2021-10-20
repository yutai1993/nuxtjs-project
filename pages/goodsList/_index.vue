<template>
  <div class='goods-list'>
    <!-- 导航 -->
    <van-nav-bar title='商品列表' left-text='返回'
                 left-arrow fixed @click-left='clickLeft'>
    </van-nav-bar>
    <div class='nav_fixed'></div>
    <!-- 搜索 -->
    <van-search
      v-model='value'
      v-tap='tapHandle'
      shape='round'
      disabled
      placeholder='请输入搜索关键词'
    />

    <!---->
    <van-tabs v-model='active' sticky>
      <van-tab title='综合'>
        <van-pull-refresh v-model='refreshing' @refresh='onRefresh'>
          <van-list
            v-model:loading='loading'
            :finished='finished'
            :immediate-check='false'
            finished-text='没有更多了'
            @load='onLoad'
          >
            <template v-for='item in list'>
              <nuxt-link :to='`/goods-detail/${item.goods_id}`' custom v-slot='{ navigate }'
                         :key='item.goods_id'>
                <div @click='navigate' @keypress.enter='navigate' role='link' class='goods-item'>
                  <div class='goods-left'>
                    <div class='img-box'>
                      <img
                        :src="item.goods_small_logo ? item.goods_small_logo : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg' "
                        alt=''>
                    </div>
                  </div>
                  <div class='goods-right'>
                    <div class='title-box'>
                      <span class='ittle'>{{ item.goods_name }}</span>
                    </div>
                    <p class='price'>￥{{ item.goods_price }}</p>
                  </div>
                </div>
              </nuxt-link>
            </template>

          </van-list>
        </van-pull-refresh>

      </van-tab>
      <van-tab title='销量'>销量</van-tab>
      <van-tab title='价格'>价格</van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'goodsList',
  async asyncData({ $goodsList, params: query, store}) {
    let params = {
      pagenum: 1,
      cid: query.index,
      pagesize: 20
    }
    let loading = false // 是否处于加载状态，加载过程中不触发 load 事件
    let finished = false // 是否已加载完成，加载完成后不再触发 load 事件
    let refreshing = false // 下拉刷新 是否处于加载中状态
    await store.commit('goodsList/DELGOODS')
    await store.dispatch('goodsList/getGoods', params)
    let result = store.state.goodsList.result;
    let list = store.state.goodsList.list;

    if (result && result.meta.status === 200){
      params.pagenum = ++params.pagenum
      // 加载完成 关闭加载中 关闭本次加载
      loading = false
      // 到达总条数
      if (list.length >= result.message.total) {
        // 到底了
        finished = true
      }
    }

    return {
      loading,
      finished,
      refreshing,
      params
    }
  },

  data() {
    return {
      value: '',
      active: 0,

    }
  },

  computed: {
    ...mapState('goodsList', ['list', 'result'])
  },
  methods: {

    /* 上拉 */
    async onLoad() {
      // 下拉刷新执行
      if (this.refreshing) {
        this.$store.commit('goodsList/DELGOODS')
        this.refreshing = false
      }
      // 是否处于加载状态 加载中 不触发 onLoad事件
      this.loading = true

      await this.$store.dispatch('goodsList/getGoods', this.params)
      if (this.result && this.result.meta.status === 200) {
        this.params.pagenum = ++this.params.pagenum
        // 加载完成 关闭加载中 关闭本次加载
        this.loading = false
        // 到达总条数
        if (this.list.length >= this.result.message.total) {
          // 到底了
          this.finished = true
        }
      }

    },

    /* 下拉 */
    onRefresh() {
      // 清空列表数据
      this.finished = false
      this.params.pagenum = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },

    clickLeft() {
      this.$router.back()
    },
    tapHandle(fn, e) {
      this.$router.push({
        name: 'search'
      })
    }
  }
}
</script>

<style lang='scss' >
.goods-list {
  .van-tabs__line {
    width: 33.33%;
  }

  .goods-item {
    display: flex;
    flex-wrap: nowrap;
    margin: 10px 0;

    .goods-left {
      flex: 1;
      display: flex;
      justify-content: center;

      .img-box {
        width: 80px;
        height: 80px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

    }

    .goods-right {
      flex: 2;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;


      .title-box {
        padding-right: 10px;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .price {
        color: red;
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
