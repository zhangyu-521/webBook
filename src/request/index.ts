import axios from 'axios';
import { ElMessage } from 'element-plus';
import { start, close } from '@/utils/nprogress'
import 'element-plus/theme-chalk/el-message.css'
// 获取所有账户信息：http://8.140.26.30:9527/getAllAcctInfos
// 获取所有订单信息：http://8.140.26.30:9527/getAllOrderInfos
// 获取所有分类信息：http://8.140.26.30:9527/typesInfo
// 获取所有公告：http://8.140.26.30:9527/getAllPosterInfos
// 删除分类：http://8.140.26.30:9527/deleteType/{id}  
// 删除书籍：http://8.140.26.30:9527/deleteBook/{id}
// axios.defaults.baseURL = 'http://8.140.26.30:9527/'

axios.interceptors.request.use((config) => {
    // console.log(config, '请求头哦')
    start()
    return config
})




axios.interceptors.response.use((config) => {
    // console.log(config, '响应头哦')
    console.log(config, '响应头哦')
    close()
    return config
}, (err) => {
    switch (err.status) {
        case 500:
            ElMessage({
                type: 'error',
                message: `服务器错误`,
            })
            break;

        default:
            break;
    }
    close()

    console.log(err, '响应头哦')
})


async function request<T>(url: string, method: string = 'get', data: any = {}, showMessage: boolean = true) {
    let requestData: any
    try {
        const res = await axios({
            url,
            method,
            data
        })
        console.log(res, '请求结果')
        requestData = res.data
        if (requestData.code === 200) {
            if (showMessage) {
                ElMessage({
                    type: 'success',
                    message: `操作成功`,
                })
            }
            return requestData.data as T
        } else {
            ElMessage({
                type: 'error',
                message: requestData.message,
            })
            return null
        }
    } catch (err) {
        console.log(err, '请求错误')
    }


}



export default request
