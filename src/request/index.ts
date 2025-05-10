import axios from 'axios';
import { ElNotification } from 'element-plus';
import { start, close } from '@/utils/nprogress'
// 获取所有账户信息：http://8.140.26.30:9527/getAllAcctInfos
// 获取所有订单信息：http://8.140.26.30:9527/getAllOrderInfos
// 获取所有分类信息：http://8.140.26.30:9527/typesInfo
// 获取所有公告：http://8.140.26.30:9527/getAllPosterInfos
// 删除分类：http://8.140.26.30:9527/deleteType/{id}  
// 删除书籍：http://8.140.26.30:9527/deleteBook/{id}
// axios.defaults.baseURL = 'http://8.140.26.30:9527/'

axios.interceptors.request.use((config) => {
    console.log(config, '请求头哦')
    start()
    return config
})




axios.interceptors.response.use((config) => {
    console.log(config, '响应头哦')
    close()
    return config
})


async function request<T>(url: string, method: string = 'get', data: any = {}) {
    const res = await axios({
        url,
        method,
        data
    })
    let requestData = res.data
    if (requestData.code === 200) {
        return requestData.data as T
    } else {
        ElNotification({
            title: '错误',
            message: requestData.message,
            type: 'error'
        })
        return null
    }
}



export default request
