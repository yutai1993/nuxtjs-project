export default function ({ $axios, redirect, error: nuxtError }) {
  // 请求拦截
  $axios.onRequest(config => {
    config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  })


  // 响应拦截
  $axios.onResponse(response => {
    // const { meta, msg } = response.data
     return response.data
  })

  // 程序上的错误 示例：500、300、400 等
  $axios.onError(error => {
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
      /*default:
        error.message = `未知错误${error.response.status}`*/
    }
    nuxtError({
      // 错误页面显示的状态码
      statusCode: error.response.status,
      // 错误页面显示的的错误消息
      message: error.message,
    });
    // 阻止浏览器抛出错误
    return Promise.resolve(false);
  })

}
