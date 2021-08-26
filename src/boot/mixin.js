import dotenv from 'dotenv'
dotenv.config()

// mixins 每一個元件都會用到的 methods computed function 拉出來寫
export default async ({ Vue }) => {
  Vue.mixin({
    data () {
      return {
        env: {
          VUE_APP_API: process.env.VUE_APP_API
        }
      }
    },
    methods: {
    },
    computed: {
      user () {
        // 去抓 vuex 裡 user 資料夾裡 gatters 裡的 user function
        // export function user (state) {return { islogin: state.user.account.length > 0, isAdmin: state.user.role === 1, ...state.user }}
        // 在每個元件都去 computed 使用者的權限
        return this.$store.getters['user/user']
      }
    }
  })
}
