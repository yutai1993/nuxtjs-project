import axios from 'axios'
import { Toast } from 'vant'

/* 取消构造器 */
const CancelToken = axios.CancelToken
let cancel  // 如需取消发送请求 调用 cancel()

let toast = null; // loading加载。。。
let count = 0 // 请求计数器
let timeId = null;
let delayLoading = 200;

/* 开启loading 200ms之内返回数据不开启 loading */
function setDelayLoading(){
  clearTimeout(timeId)
  timeId = setTimeout(() => {
    toast = Toast.loading({
      duration: 0,
      message: '加载中...',
      forbidClick: true,
    });
    clearTimeout(timeId)
  },delayLoading)
}

/* 取消请求 */
function setCancelToken(){
  return new CancelToken(function executor (c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c /* c 就是取消函数 在需要取消的地方调用 */
  })
}

/* clear loading */
function clearLoading(){
  clearTimeout(timeId)
  if (count === 0 && toast) {
    toast.clear();
  }
}

axios.interceptors.request.use(function (config) {
  config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  config.timeout = 50000 // 请求超时
  /* 请求加1 */
  count++
  setDelayLoading()
  /* 配置取消请求 */
  config.cancelToken = setCancelToken()

  // cancel('手动取消请求')

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  /* 请求减1 */
  count--
  clearLoading()

  const { meta, msg } = response.data
  if (meta.status !== 200) {
   Toast(msg);
  }
  return response.data
}, function (error) {

  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `未知错误${error.response.status}`
    }
  } else {
    // error.message = "连接到服务器失败";
  }

  // 发生错误关闭loading
  clearTimeout(timeId)
  if (toast){
    toast.clear();
  }

  // 取消发送请求的错误
  if (axios.isCancel(error)) {
    Toast(error.message)
    return
  }

  Toast(error.message)


  return Promise.reject(error)
})

export default axios
