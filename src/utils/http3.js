import axios from "axios"
import { setSync, getSync } from "./chrome"


//const baseURL= 'https://sapi.fastbs55.com/';
const baseURL= 'https://sportapi.fastball2.com/'
const auth = 'to_JCLO9DV1qhu0V5JBvZAsnSkR0SvfZ4sg'

let myAxios = axios.create({
  //baseURL: 'https://sportapi.fast1sports66.com/',
  baseURL: baseURL,

  //baseURL: 'http://localhost:1088/',
  responseType: 'json',
  validateStatus(status) {
    // 200 外的状态码都认定为失败
    return status === 200
  }
})
//myAxios.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
myAxios.interceptors.request.use(async config => {
  // const token = "sVXpKwj0tVibMTrmQWVEiRoQT6EcaPgq"

  // if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
  //   config.headers.authorization = decodeURI(token)  //请求头加上token
  // } 
  return config
  },
  err => {
      return Promise.reject(err)
  }
)

// http response 拦截器
myAxios.interceptors.response.use(
  response => {
    //拦截响应，做统一处理 
    //console.log(resopnse)
    return response.data
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    console.log(error)
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  }
)

const request = {
  baseURL: 'https://whuhhrmapi.asclepius.whxh.com.cn/',
  token: auth,
  post(url, params) {
    return myAxios.post(url, params, {
      // transformRequest: [(params) => {
      //   let result = ''
      //   Object.keys(params).forEach((key) => {
      //     if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
      //       result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
      //     }
      //   })
      //   return result
      // }],
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      }
    })
  },
  put(url, params) {
    return myAxios.put(url, params, {
      transformRequest: [(params) => {
        let result = ''
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  get(url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return myAxios.get(`${url}${_params}`)
  },
  delete(url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return myAxios.delete(`${url}${_params}`)
  },
  export (url, params = {}) {
    message.loading('导出数据中')
    return myAxios.post(url, params, {
      transformRequest: [(params) => {
        let result = ''
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      responseType: 'blob',
      timeout: 90000
    }).then((r) => {
      const content = r.data
      const blob = new Blob([content])
      const fileName = `${new Date().getTime()}_导出结果.xlsx`
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, fileName)
      }
    }).catch((r) => {
      console.error(r)
      message.error('导出失败')
    })
  },
  download(url, params, filename) {
    message.loading('文件传输中')
    return myAxios.post(url, params, {
      transformRequest: [(params) => {
        let result = ''
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      responseType: 'arraybuffer',
      timeout: 90000
    }).then((r) => {
      debugger
      const content = r.data
      const blob = new Blob([content])
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, filename)
      }
    }).catch((r) => {
      console.error(r)
      message.error('下载失败')
    })
  },
  upload(url, params) {
    return myAxios.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default request