/*
指令 事件名称    描述
v-tap  点击事件
v-swipe    滑动事件
v-swipeleft    左滑事件
v-swiperight   右滑事件
v-swipedown    下滑事件
v-swipeup  上滑事件
v-longtap  长按事件
*/

import TouchCls from './touch-cls'

const install = (Vue, options) => {
  // 点击事件
  Vue.directive('tap', {
    bind: (el, binding) => {
      const touch = new TouchCls(el, binding, 'tap')
      touch.initialize()
    }
  })
  // 长按事件
  Vue.directive('swipe', {
    bind: (el, binding) => {
      const touch = new TouchCls(el, binding, 'swipe')
      touch.initialize()
    }
  })
  // 左滑
  Vue.directive('swipeleft', {
    bind: (el, binding) => {
      const touch = new TouchCls(el, binding, 'swipeleft')
      touch.initialize()
    }
  })
  // 右滑
  Vue.directive('swiperight', {
    bind: (el, binding) => {
      const touch = new TouchCls(el, binding, 'swiperight')
      touch.initialize()
    }
  })
  // 下滑
  Vue.directive('swipedown', {
    bind: (el, binding) => {
      const touch = new TouchCls(el, binding, 'swipedown')
      touch.initialize()
    }
  })
  // 上滑
  Vue.directive('swipeup', {
    bind: (el, binding) => {
      const touch = new TouchCls(el, binding, 'swipeup')
      touch.initialize()
    }
  })
  // 长按事件
  Vue.directive('longtap', {
    bind: (el, binding) => {
      const touch = new TouchCls(el, binding, 'longtap')
      touch.initialize()
    }
  })

}

export default {
  install
}


