<template>
  <div class='category'>
    <!-- 搜索 -->
    <van-search
      v-model='value'
      shape='round'
      disabled
      @click='tapHandle'
      placeholder='请输入搜索关键词'
    />
    <use-tabs :categoryList='category'></use-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UseTabs from '@/components/tabs/usetabs'
export default {
  name: 'category',
  components: { UseTabs },
  layout: 'CustomLayout',
  async asyncData({ store }) {
    let keywords = '分类搜索引擎的关键词'
    let description = '分类搜索引擎的描述'
    await store.dispatch('category/fetchCategory')
    return {
      keywords,
      description
    }
  },
  data(){
    return {
      value: ''
    }
  },
  head(){
    return {
      title: '分类title',
      meta: [
        // -定义针对搜索引擎的关键词
        { hid: 'keywords', name: 'keywords', content: this.keywords },
        // -定义针对搜索引擎的全局描述
        { hid: 'description', name: 'description', content: this.description },
      ]
    }
  },
  computed: {
    ...mapState('category', ['category'])
  },
  methods: {
    /* 进入搜索页 */
    tapHandle() {
      this.$router.push({ name: 'search' })
    }
  }
}
</script>

<style lang='scss' scoped>
.category{
  padding-bottom: 51px;
}
.van-search {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>
