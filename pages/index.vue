<template>
  <div class='home'>
    <!-- 搜索 -->
    <van-search
      v-model='value'
      v-tap='tapHandle'
      shape='round'
      placeholder='请输入搜索关键词'
      disabled
    />
    <!--  轮播  -->
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in swiper" :key="image.goods_id">
        <nuxt-link to="/">
          <img :src="image.image_src"/>
        </nuxt-link>

      </van-swipe-item>
    </van-swipe>
    <!--  导航  -->
    <div class="nav">
      <div class="nav-item" v-for="item in navigation" :key="item.name">
        <nuxt-link class="link" to="/">
          <img :src="item.image_src" :alt="item.name">
        </nuxt-link>
        <span class="nav-name">{{ item.name }}</span>
      </div>
    </div>

    <!-- 楼层   -->
    <div class="building" >
      <template v-for="(item, index) in building">
        <div class="building-header">
          <span>{{ item.floor_title.name }}</span>
          <img :src="item.floor_title.image_src" :alt="item.floor_title.name">
        </div>
        <div class="building-body clearfix">
          <div class="building-list-item" v-for="list in item.product_list" :key="list.name">
            <img :src="list.image_src" alt="">
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'index',
  layout: 'CustomLayout',

  async asyncData({ store }) {
    let keywords = '首页搜索引擎的关键词'
    let description = '首页搜索引擎的描述'
    await store.dispatch('home/fetchSwiper')
    await store.dispatch('home/fetchNavigation')
    await store.dispatch('home/fetchBuilding')
    return {
      keywords,
      description
    }
  },
  data() {
    return {
      value: ''
    }
  },
  head(){
    return {
      title: '首页title',
      meta: [
        // -定义针对搜索引擎的关键词
        { hid: 'keywords', name: 'keywords', content: this.keywords },
        // -定义针对搜索引擎的全局描述
        { hid: 'description', name: 'description', content: this.description },
      ]
    }
  },
  computed: {
   ...mapState('home', ['swiper', 'navigation', 'building'])
  },
  methods: {

    /* 搜索跳转 */
    tapHandle(fn, e) {
      this.$router.push({
        name: 'search'
      })
    },
  }

}
</script>
<style lang='scss'>
.clearfix {
  &:after {
    display: table;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }
}
.home{
  padding-bottom: 50px;
  /* 轮播 */
  .van-swipe {
    .van-swipe-item {
      img {
        width: 100%;
        height: 150px;
        display: block;
        object-fit: cover;
      }
    }
  }
  /* 导航*/
  .nav {
    padding: 5px 0;

    .nav-item {
      display: inline-block;
      width: 25%;

      .link {
        display: block;
        padding: 5px;

        img {
          width: 100%;
        }
      }

      .nav-name {
        display: none;
      }
    }
  }
  /* 楼层 */
  .building{
    .building-header{
      height: 30px;
      padding: 8px 0 0 0;
      span{
        display: none;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .building-body{
      padding: 0 5px 10px 5px;
      .building-list-item{
        float: left;
        width: 33.33%;
        img{
          width: 100%;
          height: 100%;
          // object-fit: cover;
        }
      }
      /* 第一个 */
      .building-list-item:nth-last-child(n+5){
        height: 200px;
      }
      /* 后四个 */
      .building-list-item:nth-last-child(-n+4){
        height: 100px;
        box-sizing: border-box;
        padding-left: 3px;
      }
    }
  }
}
</style>
