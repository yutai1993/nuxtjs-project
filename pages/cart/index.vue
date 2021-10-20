<template>
<div class='cart'>
  <!-- 搜索 -->
  <van-search
    v-model='value'
    v-tap='tapHandle'
    shape='round'
    disabled
    placeholder='请输入搜索关键词'
  />
</div>
</template>

<script>
export default {
  name: 'cart',
  layout: 'CustomLayout',
  data(){
    return {
      value: ''
    }
  },
  methods: {
    tapHandle(fn, e) {
      this.$router.push({
        name: 'search'
      })
    }
  }
}
</script>

<style scoped>

</style>
