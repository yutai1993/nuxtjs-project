<template>
  <van-tabbar route>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/member" icon="friends-o">会员</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang='scss'>
.van-tabbar{
  border-top: 1px solid #ccc;
}
.van-tabbar-item--active{
  color: red;
}

</style>
