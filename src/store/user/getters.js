// 像是判斷有沒有登入可以用 state.user.account 去判斷, 但這樣要在很多分頁寫判斷式
// 直接把 state.user.account 的判斷寫成 function 放在 gatters 裡, 若之後要用到判斷權限的這資料就可以直接用 this.$store.getters['user/user'] 來要
export function user (state) {
  // 其餘運算子, 除了一般的 state.user 的資料外, 還多了判斷使用者權限的判斷式回來
  return { islogin: state.user.account.length > 0, isAdmin: state.user.role === 1, ...state.user }
}
