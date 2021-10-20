<template>
  <div>
    <!-- 左侧导航 -->
    <div class='sidebar-left'>
      <div style='height: 100%; overflow-y: auto; transition: .3s'>
        <van-sidebar v-model='active' @change='onChange'>
          <template v-for='(item,index) in categoryList'>
            <van-sidebar-item ref='sidebar' :title='item.cat_name' :key='item.cat_id' />
          </template>
        </van-sidebar>
      </div>

    </div>

    <div class='right'>
      <!--右侧内容-->
      <template v-for='(item, index) in categoryList'>
        <div class='container' v-show='active === index' :key='index'>
          <!--右侧内单个分类-->

          <component :is='getterName(index)' :item='item'></component>
          <!--<component :is="TabsItem"></component>-->
          <!--<use-tabs-item :item="item"></use-tabs-item>-->
        </div>
      </template>


    </div>
  </div>
</template>

<script>
import useTabsItem from '@/components/tabs/use-tabs-item'

export default {
  name: 'UseTabs',
  components: { useTabsItem },
  props: {
    categoryList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      active: 0,
      includesName: [0],
      timeId: null
    }
  },
  methods: {
    // 挂载组件
    getterName(index) {
      if (this.includesName.includes(index)) {
        return 'useTabsItem'
      } else {
        return false
      }
    },
    // 索引改变
    onChange(index) {
      this.observation(index)
      if (!this.includesName.includes(index)) {
        this.includesName.push(index)
      }
    },
    // 观测 点击元素保持剧中
    observation(index) {
      /* 每次点击的元素 */
      const el = this.$refs.sidebar[index].$el
      /* 框 */
      const boxObj = el.parentNode.parentNode
      /* 点击元素的高 */
      let itemHeight = el.getBoundingClientRect().height
      /* 点击元素距离顶部的距离 */
      let itemTop = el.getBoundingClientRect().top
      /* 框的高度 */
      let boxHeight = boxObj.getBoundingClientRect().height
      /* 计算当前元素所在位置 = 当前元素距离顶部的距离 + 卷曲出去的距离 */
      let itemOffsetTop = itemTop + boxObj.scrollTop
      /* 计算中心点 */
      let centerTop = (boxHeight - itemHeight) / 2
      // 滚动条最终位置
      let target = itemOffsetTop - centerTop
      // 滚动条底部距离
      let scrollBottom = boxObj.scrollHeight-boxObj.clientHeight
      clearInterval(this.timeId);
      this.timeId = setInterval(() => {
        // 滚动条当前位置
        let current = boxObj.scrollTop
        // 步数
        let step = 10
        // 减 或者 加
        step = current <= target ? step : -step
        // 移动后
        current += step
        //判断绝对值  当前- 目标 是否大于每次移动的步数
        if (boxObj.scrollTop !== scrollBottom && Math.abs(current-target)>Math.abs(step)){
          //大就继续走
          boxObj.scrollTop = current
        }else {
          //小就清理定时器
          clearInterval(this.timeId)
          //直接到达目标位置
          boxObj.scrollTop = target
        }

      }, 20)

    }

  }
}
</script>

<style lang='scss' scoped>
.sidebar-left {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  padding: 54px 0 51px 0;

}

.right {
  overflow: hidden;
  padding-top: 54px;
  padding-left: 80px;


}
</style>
