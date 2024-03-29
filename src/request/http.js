import axios from 'axios'
import globalFunction from '@/globalFunction.js'
import router from '@/router/router'
import { MessageBox, Message } from 'element-ui';

// 登录提醒
const loginTip = function() {
  MessageBox.alert('您尚未登录，请先登录', '操作提示', {
    confirmButtonText: '确定',
    callback: () => {
      router.push({
        path: '/login',
        query: { Rurl: router.currentRoute.fullPath }  //  将当前页面的url传递给login页面进行操作
      })
    }
  });
}

// 请求超时时间
axios.defaults.timeout = 10000 * 5

// 请求基础 URL
axios.defaults.baseURL = '/api'

// POST 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求携带cookie
axios.defaults.withCredentials = true

// 请求拦截器
// 在接口请求发出前执行
axios.interceptors.request.use(
    // 获取登录之后缓存在浏览器中的token，然后设置到接口请求的请求头里
  (config) => {
    config.headers['token'] = globalFunction.getCookies('token')
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response)
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error.response.status) {
      console.log(error.response)
      switch(error.response.status) {
        case 404:
          Message.warning('接口不存在，请刷新重试或联系管理员')
          break
        case 401: // 401状态码 表示“未授权”，表明请求被服务器拒绝，原因是没有提供有效的身份验证。
          loginTip()
          break
        case 500:
          Message.error('服务异常，请稍后刷新重试或联系管理员')
          break
        case 502:
          Message.error('服务异常，请稍后刷新重试或联系管理员')
          break
        default:
          return Promise.reject(error.response)
      }
    }
  }
)

/**
 * 封装 get方法 对应 GET 请求
 * @param {string} url 请求url
 * @param {object} params 查询参数
 * @returns {Promise}
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then((res) => {
        // 处理成功情况
        resolve(res.data)
      })
      .catch((err) => {
        // 处理错误情况
        reject(err.data)
      })
  })
}
/**
 * 封装 post 方法，对应 POST 请求
 * @param {string} url 请求url
 * @param {object} data 请求体
 * @param {boolean | undefined} info 请求体是否为 FormData 格式
 * @returns {Promise}
 */
export function post(url, data = {}, info) {
  return new Promise((resolve, reject) => {
    let newData = data
    if (info) {
      //  转formData格式
      newData = new FormData()
      for (let i in data) {
        newData.append(i, data[i])
      }
    }
    axios
      .post(url, newData)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

/**
 * 封装 put 方法，对应 PUT 请求
 * @param {string} url 请求url
 * @param {object} params 请求体
 * @returns {Promise}
 */
export function put(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(
      (res) => {
        resolve(res.data)
      },
      (err) => {
        reject(err.data)
      }
    )
  })
}

/**
 * 封装 axiosDelete 方法，对应 DELETE 请求
 * @param {string} url 请求url
 * @param {object} params 请求体
 * @returns {Promise}
 */
export function axiosDelete(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
