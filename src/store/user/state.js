export default function () {
  return {
    jwt: {
      // 放使用者登入時後台簽發的 jwt token
      token: '',
      // 計算從簽發這組 token 到目前過了多久, 以此來決定多久更新一次使用者的 token, 不必一直更新
      // 初始值放 0, 因為之後在 mutations 會用 new Date().getTime() 目前的時間戳記來改他的值, new Date().getTime() 出來是數字
      received: 0
    },
    user: {
      // 使用者名稱
      account: '',
      // 使用者權限
      role: 0,
      // 使用者信箱
      email: '',
      image: ''
    }
  }
}
