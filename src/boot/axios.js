import axios from 'axios'

// https://github.com/axios/axios
// baseURL, axios 的基本網址, 後面在加上請求的路由就好了, 例如 await this.axios.post('/users', 要傳去後台的資料或請求)
export default ({ Vue, router, store }) => {
  // 直接去新增一個 axios 的基本網址
  Vue.prototype.axios = axios.create({ baseURL: process.env.VUE_APP_API })

  // axios 攔截器, 當 axios 請求完成時使用的 function
  // axios.xxx --> 攔截器 --> 呼叫地方的 then 或 catch
  Vue.prototype.axios.interceptors.response.use((response) => {
    return response
  }, (error) => {
  // 如果 axios 請求有回傳東西
    if (error.response) {
      if (error.response.status === 401) {
        const extendUrl = '/users/extend'
        // 如果原始請求的位址不是延長登入的話，才延長登入
        if (error.config.url !== extendUrl) {
          const originalRequest = error.config
          // 傳送延長登入請求
          return axios.post(extendUrl, {}, {
            headers: {
              authorization: 'Bearer ' + store.state.jwt.token
            }
          }).then((response) => {
            store.commit('extend', response.data.result)
            originalRequest.headers.authorization = 'Bearer ' + store.state.jwt.token
            return axios(originalRequest)
          }).catch((error) => {
            store.commit('logout')
            router.push('/login')
            return Promise.reject(error)
          })
        }
      }
    } else {
      if (error.code === 'ECONNABORTED' && error.message && error.message.includes('timeout')) {
        alert('請求逾時')
      } else {
        alert('網路不穩定')
      }
    }
    return Promise.reject(error)
  })
}
