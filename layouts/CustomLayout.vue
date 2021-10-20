<template>
  <div>
    <Nuxt keep-alive :keep-alive-props="{ include: ['member','index','category','cart'] }" />
    <TheFooter />
  </div>
</template>

<script>
export default {
  name: 'CustomLayout'
}
</script>

<style lang='scss'>

</style>
