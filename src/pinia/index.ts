import { defineStore } from 'pinia'
import { reactive } from 'vue'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('main', () => {
    // other options...

    const userInfo = reactive({
        username: '',
        password: '',
        name: '',
        // account: localStorage.getItem('account') || '',
        account: '',
    })

    return {
        userInfo
    }
})