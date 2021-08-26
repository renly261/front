<template lang="pug">
  //- 所有頁面的 layouts
  q-layout#navDrawer(view="hHh LpR fff")
    //- 導覽列 -------------------------------------------------------------------------------------------
    q-header(elevated)
      q-toolbar.row.bg-light-blue-9.text-white.shadow-2(style="height:60px")
        //- 漢堡按鈕, 摺疊側邊欄
        q-btn#menu(flat round dense icon="menu" @click="drawer = !drawer").q-mr-sm
        //- 首頁 logo
        q-btn#logo(stretch flat label="iCom 電腦產品購物網" to='/')
        //- 使用者大頭貼
        q-img.q-ml-auto.q-mr-lg(:src='form.image' v-if="user.islogin || user.isAdmin")
        //- 使用者姓名
        .text-body1.q-mr-xl#name(v-if="user.islogin || user.isAdmin") {{form.account}} 您好

    //- 側邊欄 -------------------------------------------------------------------------------------------
    q-drawer#mainDrawer(v-model="drawer" show-if-above :width="200" :breakpoint="700" bordered content-class="bg-grey-3")
      q-scroll-area.fit
        q-item.col-12(clickable v-ripple to='/about')
          q-item-section(avatar)
            q-icon(name='info')
          q-item-section 關於我們

        q-item.col-12(clickable v-ripple  to='/adminProduct')
          q-item-section(avatar)
            q-icon(name='store')
          q-item-section 最新產品

        q-item.col-12(clickable v-ripple to='/favorite')
          q-item-section(avatar)
            q-icon(name='favorite')
          q-item-section 收藏清單

        q-item.col-12(clickable v-ripple to='/question')
          q-item-section(avatar)
            q-icon(name='contact_support')
          q-item-section 常見問題

        q-item.col-12(clickable v-ripple).q-mt-auto
          q-expansion-item(expand-separator icon="account_circle" label="會員專區" caption="" )
            .q-list
              //- 註冊
              q-btn(v-if="!user.islogin" label="會員註冊" stretch flat @click="register = true")
              //- 彈出對話框
              q-dialog(v-model="register")
                q-card#refisterCard
                  //- 註冊表單
                  q-form(@submit="submitRegister" @reset="reset").q-gutter-md
                      h5.text-center.q-mt-xl 會員註冊
                      h6(style="margin-bottom:0px;").q-pa-md 個人資料
                      q-card-section(style="margin-top:0px;")
                        q-input(filled
                                v-model="form.account"
                                label="帳號"
                                hint="可以使用"
                                :error="!state.account"
                                error-message="帳號長度請在 4 ~ 20 個字之間"
                                )
                      q-card-section
                        q-input(filled
                                v-model="form.password"
                                label="密碼"
                                hint="可以使用"
                                :error="!state.password"
                                error-message="密碼長度請在 4 ~ 20 個字之間"
                                )
                      q-card-section
                        q-input(filled
                                v-model="form.email"
                                label="信箱"
                                hint="可以使用"
                                :error="!state.email"
                                error-message="請輸入正確的信箱格式"
                                )
                      h6(style="margin-bottom:0px;").q-pa-md.q-mt-lg 使用者頭像
                      q-card-section(style="margin-top:0px;").text-center
                        img-inputer(v-model="form.image" theme="dark" size="large" placeholder="上傳你的大頭貼" bottom-text="點擊或拖曳以修改")
                      h6(style="margin-bottom:0px;").q-pa-md.q-mt-lg 收貨地址
                      q-card-section(style="margin-top:0px;")
                        .row.q-gutter-md
                          .col
                            q-input(filled
                                v-model="zip"
                                label="郵遞區號")
                          .col
                            q-input(filled
                                v-model="city"
                                label="縣市")
                          .col
                            q-input(filled
                                v-model="township"
                                label="鄉鎮市區")
                        .row.q-gutter-md.q-mt-md
                          .col
                            q-input(filled
                                v-model="road"
                                label="街道名稱")
                          .col
                            q-input(filled
                                v-model="number"
                                label="住址號碼")
                          .col
                            q-input(filled
                                v-model="floor"
                                label="住戶樓層")

                      q-card-section.text-center.q-mt-lg
                        div
                          //- 送出重寫按鈕
                          q-btn(label="送出" type="submit" color="primary" v-close-popup)
                          q-btn(label="重寫" type="reset" color="primary" flat ).q-ml-sm
              //- 登入
              q-btn(v-if="!user.islogin" label="會員登入" stretch flat @click="login = true")
              //- 彈出對話框
              q-dialog(v-model="login")
                q-card#loginCard
                  //- 登入表單
                  q-form(@submit="submitLogin" @reset="reset" style="width:400px; height:100%").q-gutter-md.q-pa-md
                      q-card-section
                        .text-h5.text-center 會員登入
                      q-card-section
                        q-input(filled
                                v-model="form.account"
                                label="帳號"
                                hint="可以使用"
                                error-message="帳號長度請在 4 ~ 20 個字之間"
                                :error="!state.account"
                                )
                      q-card-section
                        q-input(filled
                                v-model="form.password"
                                label="密碼"
                                hint="可以使用"
                                error-message="密碼長度請在 4 ~ 20 個字之間"
                                :error="!state.password"
                                )
                      q-card-section
                        div.text-center
                          //- 送出重寫按鈕
                          q-btn(label="送出" type="submit" color="primary" v-close-popup)
                          q-btn(label="重寫" type="reset" color="primary" flat ).q-ml-sm
              //- 登出
              q-btn(v-if="user.islogin" @click="logout" stretch flat label="會員登出")
              //- 後台管理
              q-btn(v-if="user.islogin && !user.isAdmin" to='/userMemberManage' stretch flat label="使用者後台管理")
              q-btn(v-if="user.islogin && user.isAdmin" to='/adminMemberManage' stretch flat label="管理者後台管理")

        q-item.col-12(clickable v-ripple to='/cart')
          q-item-section(avatar)
            q-icon(name='shopping_cart')
          q-item-section 購物車

        q-item.col-12(clickable v-ripple @click="drakMode")
          q-item-section(avatar)
            q-icon(name='settings_brightness')
          q-item-section 黑暗模式

    //- 網頁內容區 -------------------------------------------------------------------------------------------
    q-page-container
      vue-page-transition(name="fade-in-right")
        router-view

    q-footer.bg-grey-8.text-white(elevated)
      q-toolbar.row
        q-avatar.col-4.flex.justify-center
          a(href="#")
            q-icon(name="fab fa-instagram")
          a(href="#")
            q-icon(name="fab fa-twitter")
          a(href="#")
            q-icon(name="fab fa-facebook")
          a(href="#")
            q-icon(name="fab fa-youtube")
        q-toolbar-title.col-4.flex.justify-center Copyright © 20201 iCom.
        .text-body.col-4.flex.justify-center 243新北市泰山區貴子里致遠新村55之1號

</template>

<script>
import isEmail from 'validator/es/lib/isEmail'

export default {
  name: 'NavFooter',
  data () {
    return {
      // q-dialog 彈出對話框
      register: false,
      login: false,
      // 側邊欄
      drawer: false,
      // 會員註冊或登入要傳給後台那些資料
      form: {
        account: '',
        password: '',
        email: '',
        image: '',
        address: ''
      },
      // 地址資料
      zip: '',
      city: '',
      township: '',
      road: '',
      number: '',
      floor: ''
    }
  },
  computed: {
    // 驗證帳號密碼信箱
    state () {
      const account = this.form.account
      const password = this.form.password
      const email = this.form.email
      return {
        // 三原運算子語法, 判斷式 ? true 要執行的 : false 要執行的
        // 若 ? 前的判斷式是 ture 執行 : 前面, 若 ? 前的判斷式是 false 執行 : 後面
        // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
        // 以這個做例子就是使用者輸入帳號長度是 0 state.account 是空的, 若不是 0 state.account 會驗證帳號長度 4 ~ 20 字
        account: account.length === 0 ? null : account.length >= 4 && account.length <= 20,
        password: password.length === 0 ? null : password.length >= 4 && password.length <= 20,
        email: email.length === 0 ? null : isEmail(email)
      }
    }
  },
  methods: {
    // 黑暗模式
    drakMode () {
      this.$q.dark.toggle()
    },
    // 送出註冊資料表單
    async submitRegister () {
      try {
        // 將地址詳細資料加起來變成完整 address
        this.form.address = this.zip + ' ' + this.city + this.township + this.road + this.number + this.floor
        // 要上傳檔案要用 form-data 格式
        // 先建立一個 form-data
        const fd = new FormData()
        // 這裡 this.form 是 JSON, 不能用 for of 只能用 for in, for in 會迴出 JSON 裡的 key, 也就是 account password ...
        for (const key in this.form) {
          // 添加東西用 append(key, value)
          // JSON 取值 => JSON[key]
          fd.append(key, this.form[key])
        }
        // 送出註冊資料表單時將上面的 form-data 傳給後台
        await this.axios.post('/users', fd)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '註冊成功'
        })
        if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '註冊失敗',
          text: error.response.data.message
        })
      }
    },
    // 送出登入資料表單
    async submitLogin () {
      try {
        // 同上註冊, 將使用者在 input 輸入的資料先經過後台路由, 後台路由根據前台傳來的路徑決定用哪個 controllers funtion 去處理前台來的資料
        // 傳送登入請求後我們會拿到一組後台簽發的 jwt token, 之後要做任何和這使用者有關的事情都要帶這組 token 過去, 這組 token 前端會存在 vuex 裡面, vuex 存放每個頁面的共用資料
        //! 這裡將丟去後台的登入資料存進變數 data, 丟進 mutations 裡面做修改, 在下面用 this.$store.commit('user/login', data) 來引用進修改完的 data 達到實時更新所有頁面的共用資料
        const { data } = await this.axios.post('/users/login', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '登入成功'
        })
        // 使用者的大頭貼
        this.form.image = `${process.env.VUE_APP_API}/files/${data.image}`
        // 這裡 commit() 裡面的路徑前面要多加一個 user, 因為我們的 store 的 state mutations 那些是寫在 store user 資料夾裡, 在 index.js 裡的 modules 在引用進 user 資料夾, 所以前面路徑前面的 user 就是 index.js 裡的 modules 裡引進的 user 資料夾, 後面一樣接 vuex mutations 的 function
        this.$store.commit('user/login', data)
        // 消除 console 錯誤, 若使用者當前不再首頁才把他丟回首頁
        if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '登入失敗',
          text: error.response.data.message
        })
        console.log(error)
      }
    },
    // 重寫欄位
    reset () {
      this.form.account = ''
      this.form.password = ''
      this.form.email = ''
      this.form.image = null
    },
    // 登出
    async logout () {
      try {
        await this.axios.delete('/users/logout', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '登出成功'
        })
        // 呼叫 vuex 的登出, 將使用者資訊清空
        this.$store.commit('user/logout')
        if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '登出失敗'
        })
      }
    }
  },
  // mounted 只會在進頁面時讀取一次, 所以如果要實時更新資料要用 vuex
  async mounted () {
    // 檢查使用者的簽證 token
    if (this.$store.state.user.jwt.token.length === 0) return
    // 將 Date.now() 現在的時間扣掉使用者收到這組簽證的時間來看這組 jwt 已經過了多久了
    const diff = Date.now() - this.$store.state.user.jwt.received
    try {
      // 若進入網頁時，距離收到 jwt 過了六天，重新取得一次新的 jwt
      // 1000 * 60 * 60 * 24 * 6 = 6 天的毫秒數
      if (diff > 1000 * 60 * 60 * 24 * 6) {
        // 後台 controllers users extend, 延長使用者的 jwt
        const { data } = await this.axios.post('/users/extend', {}, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        // 呼叫 vuex 更改過後的 jwt 及收到這組 jwt 的現在的時間
        this.$store.commit('user/extend', data.result)
      }
      // 進入網頁時重新取一次使用者資料
      const { data } = await this.axios.get('/users/', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.user.jwt.token
        }
      })
      // 會員大頭貼
      this.form.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
      // 會員帳號
      this.form.account = data.result.account
      // 呼叫 vuex 更改過後的會員資料
      this.$store.commit('user/getinfo', data.result)
    } catch (error) {
      this.$store.commit('user/logout')
    }
  }
}
</script>
