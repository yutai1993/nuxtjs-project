<template>
 <div>
   <template v-for="(item2, index2) in item.children" >
     <div class="list-box" :key="index2">
       <div class="title">
         <p>{{ item2.cat_name }}</p>
       </div>
       <div class="list">
         <template v-for="(item3, index3) in item2.children" >
           <nuxt-link class="list-item" :to="`/goodsList/${item3.cat_id}`" :key="index3">
             <div class="img-box">
               <img :src="item3.cat_icon" alt="">
             </div>
             <p>{{ item3.cat_name }}</p>
           </nuxt-link>
         </template>
       </div>
     </div>
   </template>
 </div>
</template>

<script>
export default {
  name: 'use-tabs-item',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-box {
  margin-bottom: 30px;

  .title {
    padding: 5px;
    font-size: 14px;
    font-weight: 700;
  }

  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .list-item {
      width: 33.33%;
      display: flex;
      align-items: center;
      flex-direction: column;
      color: var(--van-sidebar-selected-text-color);
      .img-box {
        padding: 20px 20px 5px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      > p {
        font-size: 14px;
      }
    }
  }
}
</style>
