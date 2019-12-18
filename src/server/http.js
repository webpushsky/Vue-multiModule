import axios from 'axios'
// import qs from 'qs'
import { Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vue from 'vue'
Vue.prototype.$ajax = axios
axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true
axios.interceptors.request.use((config) => {
  // Indicator.open({
  //   text: '加载中...',
  //   spinnerType: 'fading-circle'
  // })
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  return config
}, (error) => {
  Indicator.close()
  console.log('加载超时[timeout]')
  // Toast({
  //   message: '加载超时',
  //   position: 'middle',
  //   duration: 3000
  // })
  return Promise.reject(error)
})

// axios.interceptors.response.use(undefined, function axiosRetryInterceptor (err) {
//   var config = err.config
//   // If config does not exist or the retry option is not set, reject
//   if (!config || !config.retry) return Promise.reject(err)
//   // Set the variable for keeping track of the retry count
//   config.__retryCount = config.__retryCount || 0
//   // Check if we've maxed out the total number of retries
//   if (config.__retryCount >= config.retry) {
//     // Reject with the error
//     return Promise.reject(err)
//   }
//   // Increase the retry count
//   config.__retryCount += 1
//   // Create new promise to handle exponential backoff
//   var backoff = new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve()
//     }, config.retryDelay || 1)
//   })
//   // Return the promise in which recalls axios to retry the request
//   return backoff.then(function () {
//     return axios(config)
//   })
// })

axios.interceptors.response.use((res) => {
  // Indicator.close()
  return res
}, (error) => {
  console.log(error)
  console.log('加载超时')
  // if (error.Error.indexOf('timeout') !== -1) {
  //   var originalRequest = error.config
  //   console.log('加载超时')
  //   return axios.interceptors.response.use(originalRequest)
  // }
  console.log('好多人在访问呀，请重新试试[timeout]')
  // Indicator.close()
  // if (error) {
  //   let errortime = null
  //   clearTimeout(errortime)
  //   errortime = setTimeout(() => {
  //     Toast({
  //       message: error.message,
  //       position: 'middle',
  //       duration: 2000
  //     })
  //     clearTimeout(errortime)
  //   }, 0)
  // }
  return Promise.reject(error)
})
