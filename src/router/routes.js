
const routes = [
  {
    // 前台 ----------------------------------------------------------------------------
    path: '/',
    component: () => import('layouts/NavDrawer.vue'),
    children: [
      {
        // children 第一層是 router-view 的根目錄
        path: '',
        component: () => import('pages/front/Home.vue'),
        meta: {
          title: 'iCom 首頁'
        }
      },
      {
        path: 'about',
        component: () => import('pages/front/About.vue'),
        meta: {
          title: 'iCom 關於我們'
        }
      },
      {
        path: 'adminProduct',
        component: () => import('pages/front/AdminProduct.vue'),
        meta: {
          title: 'iCom 最新商品'
        }
      },
      {
        // 後面的 :id 會去抓網址後面的東西然後塞進 params 裡面, 在其他頁面就可以用 this.$route.params.id 去獲得加在網址後面的東西, this.$route.params.id 的 id 是依據 routes 裡面的 :id, 若 routes 裡面是 :abc, 在其他頁面就可以用 this.$route.params.abc 去獲得加在網址後面的東西
        // 例如這裡是用 商品的 _id 加在網址後面, 所以 :id 就是商品 id, 在其他頁面可以用 this.$route.params.id 得到商品的 _id,
        path: '/adminProductBuy/:id',
        component: () => import('pages/front/AdminProductBuy.vue'),
        meta: {
          title: 'iCom 最新商品購買頁面'
        }
      },
      {
        path: 'favorite',
        component: () => import('pages/front/Favorite.vue'),
        meta: {
          title: 'iCom 收藏清單'
        }
      },
      {
        path: 'question',
        component: () => import('pages/front/Question.vue'),
        meta: {
          title: 'iCom 常見問題'
        }
      },
      {
        path: 'cart',
        component: () => import('pages/front/Cart.vue'),
        meta: {
          title: 'iCom 購物車'
        }
      }
    ]
  },
  {
    // 管理者後台 ----------------------------------------------------------------------------
    path: '/adminManage',
    component: () => import('layouts/AdminManage.vue'),
    meta: {
      title: 'iCom 管理者後台'
    },
    children: [
      {
        path: '/adminMemberManage',
        component: () => import('pages/back/AdminMemberManage.vue'),
        meta: {
          title: '管理者會員管理'
        }
      },
      {
        path: '/adminOrderManage',
        component: () => import('pages/back/AdminOrderManage.vue'),
        meta: {
          title: '管理者訂單管理'
        }
      },
      {
        path: '/adminProductManage',
        component: () => import('pages/back/AdminProductManage.vue'),
        meta: {
          title: '管理者商品管理'
        }
      }
    ]
  },
  {
    // 使用者後台 ----------------------------------------------------------------------------
    path: '/userManage',
    component: () => import('layouts/UserManage.vue'),
    meta: {
      title: 'iCom 使用者後台'
    },
    children: [
      {
        path: '/userMemberManage',
        component: () => import('pages/back/UserMemberManage.vue'),
        meta: {
          title: '使用者會員管理'
        }
      },
      {
        path: '/userOrderManage',
        component: () => import('pages/back/UserOrderManage.vue'),
        meta: {
          title: '使用者訂單管理'
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
