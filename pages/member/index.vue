<template>
  <div class="member">
    <!-- 导航 -->
    <van-nav-bar title="个人中心" fixed @click-right="clickRight">
      <template #right>
        <van-icon name="setting-o" size="18"/>
      </template>
    </van-nav-bar>
    <div class="nav_fixed"></div>
    <!-- 账号 -->
    <div class="header">
      <!-- 登陆后的 -->
      <div class="account" v-if="account">
        <!--左侧图片-->
        <div class="header-img_box">
          <img src="@/assets/images/Avatar.png" alt="用户头像">
        </div>
        <!-- 昵称 名字 -->
        <div class="header-right">
          <p>迪妮莎时尚芭莎</p>
          <p>账号：1222222</p>
        </div>
      </div>
      <!--  未登录的-->
      <div class="account" v-if="!account">
        <!--左侧图片-->
        <div class="header-img_box">
          <img src="@/assets/images/Avatar.png" alt="用户头像">
        </div>
        <!-- 昵称 名字 -->
        <div class="header-right">
          <p>未登录</p>
        </div>
      </div>
    </div>
    <!-- 收藏 -->
    <div class="collection collection-active">
      <nuxt-link class="collection-item" to="" >
        <p>2</p>
        <p>收藏店铺</p>
      </nuxt-link>
      <nuxt-link class="collection-item" to="" >
        <p>2</p>
        <p>收藏店铺</p>
      </nuxt-link>
      <nuxt-link class="collection-item" to="" >
        <p>2</p>
        <p>收藏店铺</p>
      </nuxt-link>
      <nuxt-link class="collection-item" to="" >
        <p>2</p>
        <p>收藏店铺</p>
      </nuxt-link>
    </div>
    <!--我的订单-->
    <div class="order">
      <div class="order-header">
        <p>我的订单</p>
      </div>
      <div class="collection">
        <nuxt-link class="collection-item" to="" >
          <p>2</p>
          <p>收藏店铺</p>
        </nuxt-link>
        <nuxt-link class="collection-item" to="" >
          <p>2</p>
          <p>收藏店铺</p>
        </nuxt-link>
        <nuxt-link class="collection-item" to="" >
          <p>2</p>
          <p>收藏店铺</p>
        </nuxt-link>
        <nuxt-link class="collection-item" to="" >
          <p>2</p>
          <p>收藏店铺</p>
        </nuxt-link>
      </div>
    </div>
    <!-- 地址 -->
    <div class="address">
      <p>收获地址管理</p>
    </div>
    <!--其他-->
    <div class="other">
      <div class="address phone">
        <p>联系客服</p>
        <p>400-000-000</p>
      </div>
      <div class="address">
        <p>意见反馈</p>
      </div>
      <div class="address">
        <p>关于我们</p>
      </div>
    </div>
    <!-- 推荐 -->
    <div class="address">
      <p>把应用推荐给其他人</p>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'member',
  layout: 'CustomLayout',
  data(){
    return {
      account: true
    }
  },
  methods: {
    clickRight (fn, e) {
      this.$router.push({ name: 'member' })
      Toast('设置')
    }
  },
}
</script>

<style lang="scss" scoped>
.member{
  p{
    margin: 0;
  }
  .header{
    padding: 10px;
    .account{
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .header-img_box{
        width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 50%;
        margin-left: 10px;

        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .header-right{
        flex: 2;
        padding-left: 20px;
        p{
          font-size: 20px;
          color: #999;
        }
      }
    }
  }
  .collection-active{
    margin: 0 20px;
    border-radius: 15px;
    overflow: hidden;
  }
  .collection{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    background-color: #CED5CE44;
    padding: 5px 0;
    .collection-item{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      font-size: 14px;
      color: #999;
    }
  }
  .order{
    margin: 20px 20px 0;
    border-radius: 20%;
    overflow: hidden;
    padding: 8px 0;
    .order-header{
      border-bottom: 1px solid #ccc;
      color: #999;
      font-size: 14px;
      background-color: #CED5CE44;
      padding: 5px 0;
      p{
        margin-left: 10px;
      }
    }
  }
  .address{
    margin: 20px;
    overflow: hidden;
    border-radius: 15px;
    background-color: #CED5CE44;
    p{
      font-size: 14px;
      padding: 15px;
      color: #999;
    }
  }
  .other{
    margin: 0 20px;
    overflow: hidden;
    border-radius: 15px;
    background-color: #CED5CE44;
    .address{
      border-radius: 0;
      background-color: transparent;
      margin: 15px;
      &.phone{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
      }
      p{
        padding: 5px;
      }
    }

  }
}

</style>
