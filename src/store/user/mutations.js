// ()內 state 是 state.js 裡的 state
// ()內 data 是前台頁面丟過來的東西, 將前台傳過來 vuex state 裡的資料 data 透過 mutations 修改, 在到前台頁面用 this.$store.commit ('這裡 mutations function 的路徑', data) 引用修改完後的資料
export function login (state, data) {
  state.jwt.token = data.token
  // new Date().getTime() 目前的時間戳記, 資料型態是一個 number
  state.jwt.received = new Date().getTime()
  state.user.account = data.account
  state.user.role = data.role
  state.user.email = data.email
  state.user.image = data.image
}

export function logout (state) {
  state.jwt = {
    token: '',
    received: 0
  }
  state.user = {
    account: '',
    role: 0,
    email: '',
    image: ''
  }
}

export function extend (state, data) {
  state.jwt.token = data
  state.jwt.received = new Date().getTime()
}

export function getinfo (state, data) {
  state.user.account = data.account
  state.user.role = data.role
  state.user.email = data.email
  state.user.image = data.image
}

export function last (state, data) {
  state.product.last = data.last
}
