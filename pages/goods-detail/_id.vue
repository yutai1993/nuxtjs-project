<template>
  <div class="goods-detail">
    <template v-if="!loading">
      <!-- 导航 -->
      <van-nav-bar title="商品详情" left-text="返回"
                   left-arrow fixed @click-left="clickLeft">
      </van-nav-bar>
      <div class="nav_fixed"></div><!-- 占位-->
      <!--  轮播  -->
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in goodsDetail.pics" :key="image.pics_id">
          <nuxt-link to="/">
            <img
              :src="image.pics_mid ? image.pics_mid : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"
              alt=""/>
          </nuxt-link>
        </van-swipe-item>
      </van-swipe>
      <!--title 标题-->
      <div class='header-title'>
        <div class='text-box'>
          <span class='text'>
            {{ goodsDetail.goods_name }}
          </span>
        </div>
        <div class='icon' @click="clickTabHandle">
          <template v-if="collection">
            <van-icon name="like" size="19"/>
            <p>已收藏</p>
          </template>
          <template v-if="!collection">
            <van-icon name="like-o" size="19"/>
            <p>收藏</p>
          </template>
        </div>
      </div>

      <!--富文本 图片预览-->
      <use-parser :introduce="goodsDetail.goods_introduce"></use-parser>
      <!--底部动作-->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot @click="chatHandle" />
        <van-goods-action-icon icon="cart-o" text="购物车" badge="5" @click="cartHandle"/>
        <van-goods-action-icon icon="shop-o" text="店铺"  @click="shopHandle"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="warningHandle" />
        <van-goods-action-button type="danger" text="立即购买" v-tap="dangerHandle" />
      </van-goods-action>
      <!--底部占位-->
      <div class="useplaceholder"></div>
    </template>
  </div>
</template>

<script>
//import UseParser from '@/components/use-parser/use-parser'
import { getStorageItem, setStorageItem } from '@/utils/utils'
import { Toast } from 'vant'
export default {
  name: 'goods-detail',
  components: {
   // UseParser,
  },
  async asyncData({ params: query, $goodsDetail }) {
      let loading = true
      let collection = false
      let collectionShowIndex = -1
      let collectionKey = 'goodDetailCollection'
      let goodsDetail = {}
      let params = {
        goods_id: query.id
      }
    const result = await $goodsDetail.getGoodsDetail(params)
    if (result && result.meta.status === 200) {
      goodsDetail = result.message
      loading = false
    }
    return {
      loading,
      collection,
      collectionShowIndex,
      collectionKey,
      goodsDetail,
      params,
    }
  },
  watch: {
    goodsDetail() {
      this.collection = this.isCollection()
    }
  },
  methods: {
    // 切换收藏
    clickTabHandle() {
      let arr = getStorageItem(this.collectionKey) || []
      if (this.isCollection()){
        // 已收藏 取消收藏
        let putArr = arr.splice(this.collectionShowIndex, 1)
        setStorageItem(this.collectionKey, putArr)
        this.collection = false
        Toast.success('取消收藏');
      }else {
        // 没有收藏 收藏
        arr.push(this.goodsDetail)
        setStorageItem(this.collectionKey, arr)
        this.collection = true
        Toast.success('收藏成功');
      }

    },
    // 判断是否收藏
    isCollection() {
      // 判断本地是否有收藏的数组
      let storageArr = getStorageItem(this.collectionKey)
      if (!storageArr){
        setStorageItem(this.collectionKey, [])
        return false;
      }
      // 判断本地有没有本条数据
      let index = storageArr.findIndex(value => value.goods_id === this.goodsDetail.goods_id)
      this.collectionShowIndex = index + 1
      return index !== -1;

    },
    // 立即购买
    dangerHandle(fn,e) {
      Toast('立即购买')
    },
    // 加入购物车
    warningHandle() {
      Toast('加入购物车')
    },
    // 客服
    chatHandle() {
      Toast('客服')
    },
    // 进入购物车
    cartHandle() {
      this.$router.replace({name:'cart'})
    },
    // 进入店铺
    shopHandle() {
      Toast('进入店铺')
    },
    // 后退
    clickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang='scss' scoped>
.goods-detail {
  /* 轮播 */
  .van-swipe {
    .van-swipe-item {
      img {
        width: 100%;
        height: 230px;
        display: block;
        object-fit: contain;
      }
    }
  }

  /*标题*/
  .header-title{
    overflow: hidden;
    display: flex;
    font-size: 14px;
    margin: 10px 0;
    .text-box{
      display: flex;
      align-items: center;
      flex: 1;
      padding: 0 5px;
      .text{
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /*需要显示时文本行数*/
        font-weight: 700;
        line-height: 1.5;
        overflow: hidden;
        color: #333;
      }
    }
    .icon{
      width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .van-icon{

      }
      p{
        margin: 0;
      }
    }
  }

  .useplaceholder{
    height: 51px;
  }
}
</style>
