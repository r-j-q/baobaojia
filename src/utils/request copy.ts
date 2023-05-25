import axios from 'axios'
import qs from 'qs'
// import { Toast } from 'vant'
import { ElMessage } from 'element-plus'
// import Lockr from 'lockr'
 
axios.defaults.timeout = 30000
axios.defaults.baseURL = import.meta.env.VITE_BASE_API 
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
 
// http ElMessage
axios.interceptors.request.use((config) => {
  config.headers.refererUrl = window.location.href
  // config.headers.authKey = Lockr.get('authKey')
  // config.headers.sessionId = Lockr.get('sessionId')
  // 请求头参数处理
  config.data = qs.stringify(config.data)
  return config
}, (error) => {
  return Promise.reject(error)
})

// http response                                                                            
axios.interceptors.response.use( (res :any)=>{
  if (res.status && res.status === 200 && res.data.code !== 200) {
    if (res.data.code === 101) {
      window.location.href = `${window.location.origin}${import.meta.env.VITE_HREF}/login${res.data.url?`?return_url=${res.data.url}&type=${res.data.type}`:''}`
    } else if (res.data.msg && res.data.msg !== '') {
      ElMessage(res.data.msg)
    } else if (res.data.code === 203) {
      return false
    } else {
        ElMessage('系统错误')
    }
  }
  return res
}, (error) => {
  if (!error.response && error.message) {
    ElMessage('请求超时，请检查网络，刷新后重试')
  } else {
    ElMessage('系统错误')
  }
  return Promise.reject(error)
})
export default axios

/**
* 封装get方法
* @param url
* @param params
* @returns {Promise}
*/

export function get (url: any, params:any) {
  params.t = new Date().getTime()
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
* 封装post请求
* @param url
* @param data
* @returns {Promise}
*/

export function post (url: any, data: Object = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
* 封装delete方法
* @param url
* @param params
* @returns {Promise}
*/

export function doDelete (url: any, params: Object = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch (url: any, data: Object = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put (url: any, data: Object = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}



//0000000000000000000000000000000
// import axios from 'axios';
// // import { ElMessage } from 'element-plus'

 
// export const request = axios.create({
//     baseURL:  import.meta.env.VITE_BASE_API  ,
//     timeout: 1000,
     
// });
// //   请求拦截器
// request.interceptors.request.use(function (config) {
//     // 请求头添加token
//     //   if (store.state.UserToken) {
//     //     config.headers.Authorization = `Bearer ${store.state.UserToken}`
//     // }
//     // config.headers['Content-Type'] = "application/json;charset=utf-8"
//     // config.data = JSON.stringify(config.data);
    
//     return config;
// }, function (error) {
//     return Promise.reject(error);

// })
// //   响应拦截器

// request.interceptors.response.use(function (response) {
//     return Promise.resolve(response.data)
// }, function (error) {
//     return Promise.reject(error);

// })
 
 