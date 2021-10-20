<template>
<div class='use-parser'>
  <div v-html="introduce" ref="h5Html" class="h5-html" @click="previewImage($event)"></div>
  <!--图片预览-->
  <template v-if="show">
    <van-image-preview ref="preview" teleport="body" v-model="show" :images="minImgUrls" @change="onChange">
      <template v-slot:index>第{{ useCurrentIndex + 1 }}页</template>
    </van-image-preview>
  </template>
</div>

</template>

<script>
export default {
  name: 'use-parser',
  props: {
    introduce: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      show: false, // 预览组件 调用
      imgUrls: [], // 图片大数组
      minImgUrls: [], // 图片小数组
      currentImgUrl: '', // 当前点击的图片链接
      useCurrentIndex: 0 // 图片小数组中的索引
    }
  },
  watch: {
    show(nreValue){
      const { body } = document;
      if (nreValue) {
        body.addEventListener('touchmove', this.touchmoveHandle,false);
      }else {
        body.removeEventListener('touchmove', this.touchmoveHandle,false)
      }
    }
  },
  methods: {
    onChange(newIndex) {
      this.useCurrentIndex = newIndex;
    },
    previewImage(e) {
      if (e.target.nodeName == 'IMG') {
        // 遍历
        let imgs = []
        Array.prototype.slice.call(this.$refs.h5Html.getElementsByTagName('img')).forEach((item,index) => {
          imgs.push(item.getAttribute('src'))
        })
        this.imgUrls = imgs
        // 当前点击的img
        this.currentImgUrl = e.target.getAttribute('src')
        // 找到当前点击图片的索引 大数组中
        let index = this.imgUrls.findIndex(value => value === e.target.getAttribute('src'))
        // 以当前所点击的图片为索引1 截取出小数组
        this.minImgUrls = this.imgUrls.splice(index, 5)
        // 找到当前点击图片的索引 小数组中
        this.useCurrentIndex = this.minImgUrls.findIndex(value => value === e.target.getAttribute('src'))
        this.show = true
      } else {
        return
      }

    },
    touchmoveHandle(e){
      e.preventDefault();
      e.stopPropagation();
    }
  },
}
</script>

<style lang='scss' >
.use-parser{
  p{
    margin: 0;
  }
}
.h5-html {
  width: 100%;
  padding: 0;
}
.h5-html img {
  width: 100%;
}
</style>
