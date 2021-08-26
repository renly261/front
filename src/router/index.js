import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // 進入頁面前要做的事
  Router.beforeEach((to, from, next) => {
    // 若要去登入頁面且使用者帳號長度 = 0
    if (to.meta.login && store.state.user.account.length === 0) {
      // 進登入頁面
      next('/login')
      // 若要去管理者頁面且不是管理者
    } else if (to.meta.admin && store.state.user.role !== 1) {
      // 進首頁
      next('/')
    } else {
      next()
    }
  })

  // 進入頁面後要做的事
  // 在瀏覽器分頁的地方動態顯示你目前所在的分頁名稱
  Router.afterEach((to, from) => {
    document.title = to.meta.title
  })

  return Router
}
