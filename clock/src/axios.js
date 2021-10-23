/**
 * axios 封装
 */
import axios from 'axios'
import { Message } from 'element-ui'

const config = {
    baseURL: 'http://localhost:1013/',
    timeout: 2 * 60 * 1000,
    withCredentials: true,
}

function generateService(config) {
    const service = axios.create(config)
    useInterceptors(service)
    return service
}
// post请求头设置application/x-www-form-urlencoded;charset=UTF-8
function useInterceptors(service) {
    service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // service.interceptors.request.use(
    //     (config) => {
    //         config.headers.ticket = sessionStorage.getItem('ticket') ? sessionStorage.getItem('ticket') : '123456'
    //         return config
    //     },
    //     (err) => Promise.reject(err),
    // )

    // http response 拦截器
    service.interceptors.response.use(
        (response) => response,
        (error) => {
            Message.error({
                message: '出错了，请重新操作或者刷新页面！', // '加载失败，请重新操作或者刷新页面或者重新登录'
            })
            return Promise.reject(error)
        },
    )
}

export function Service(config) {
    return generateService(config)
}

const service = Service(config)

export default service
