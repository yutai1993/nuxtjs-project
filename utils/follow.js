function Follow (options) {
  this.Dom = options.Dom
  this.left = options.left
  this.top = options.top
  this.Max = this.Dom.getBoundingClientRect() // 元素信息
  // 以下为触摸点
  this._x_start = 0
  this._y_start = 0
  this._x_move = 0
  this._y_move = 0
  this._x_end = 0
  this._y_end = 0
  this.left_start = 0
  this.top_start = 0
  // 初始化
 this.init()
}

Follow.prototype = {
  init: function (){
    this.Dom.addEventListener('touchstart', (e) => {
      this.start(e)
    })
    this.Dom.addEventListener('touchmove', (e) => {
      e.preventDefault()
      this.move(e)
    })
    this.Dom.addEventListener('touchend', (e) => {
      this.end(e)
    })
  },
  start: function (e){
    this._x_start = e.touches[0].pageX
    this._y_start = e.touches[0].pageY
    this.left_start = this.Dom.getBoundingClientRect().left
    this.top_start = this.Dom.getBoundingClientRect().top
  },
  move: function (e){
    this._x_move = e.touches[0].pageX
    this._y_move = e.touches[0].pageY
    let X = parseFloat(this._x_move) - parseFloat(this._x_start) + parseFloat(this.left_start)
    let Y = parseFloat(this._y_move) - parseFloat(this._y_start) + parseFloat(this.top_start)
    // 左右滑动
    if (this.left) {
      this.Dom.style.left = X + 'px'
    }
    // 上下滑动
    if (this.top && Y >= this.Max.top && (Y <= Math.floor(this.Max.top+this.Max.height) - 20)) {
      //console.log(Y)
      this.Dom.style.top = Y + 'px'
    }

  },
  end: function (e){
    this._x_end = e.changedTouches[0].pageX
    this._y_end = e.changedTouches[0].pageY
  }
}

export { Follow }



