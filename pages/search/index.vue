<template>
  <div class='search'>
    <!-- 导航 -->
    <van-nav-bar title='搜索' left-text='返回'
                 left-arrow fixed @click-left='clickLeft'>
    </van-nav-bar>
    <div class='nav_fixed'></div>
    <!-- 搜索 -->
    <van-search
      v-model='keyword'
      shape='round'
      placeholder='请输入搜索关键词'
    />
    <ul class='search-list'>
      <nuxt-link to='' v-show='show' v-for='item in searchList' :key='item.goods_id'>
        {{ item.goods_name }}
      </nuxt-link>
      <van-empty v-show='!show' description='暂无数据' />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      keyword: '',
      searchList: null,
      show: false,
      timeId: null
    }
  },
  watch: {
    keyword(newValue) {
      clearTimeout(this.timeId)
      this.timeId = setTimeout(() => {
        if (newValue) {
          this.getSearchData(newValue)
        } else {
          this.searchList = null
          this.show = false
        }
      }, 500)
    }
  },
  methods: {
    async getSearchData(newValue) {
      const result = await this.$search.getSearch({ query: newValue })
      if (result && result.meta.status === 200) {
        this.searchList = result.message
        this.show = result.message.length !== 0
      }
    },
    clickLeft() {
      this.$router.back()
    }
  }

}
</script>

<style lang='scss' scoped>
.search-list {
  padding: 0 5px;

  a {
    font-size: 14px;
  }
}
</style>
