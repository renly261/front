<template lang="pug">
  //- 管理者商品購買 pages
  q-page#adminProductBuy.q-pa-xl.q-mt-xl
    .row.q-col-gutter-md
      //- 商品圖片
      .col-12.col-md-6#image.flex.justify-center.items-end
        q-img(:src="image")
      //- 商品資訊
      .col-12.col-md-6#info.flex.justify-center
        .row
          .col-12
            .text-h3 {{ name }}
          .col-12
            .text-h4 $ {{ price }}
          .col-12
            q-form
              q-item
                q-item-section(avatar)
                  q-icon(name="swap_horiz")
                q-item-section
                  q-slider( v-model.number="amount" :state="amountstate" :min="0" :max="10" style="width:80%" label :label-value=" amount " markers) {{amount}}
          .col-12
            .text-h6 您目前選擇了 {{amount}} 個，總金額是 {{amount * price}} 元
          .col-12.col-lg-3
            q-btn(icon="add_shopping_cart" @click="addcart" label="加入購物車" fab-mini outline )
          .col-12.col-lg-3
            q-btn(icon="favorite_border" @click="addFavorite" label="加入收藏清單" fab-mini outline )
      .col-12.flex.justify-center.q-mt-xl
        .q-gutter-y-md(style="width:100%")
          q-tabs.text-primary(v-model='tab')
            q-tab(name='商品說明' icon='mail' label='商品說明')
            q-tab(name='商品規格' icon='alarm' label='商品規格')
            //- q-tab(name='商品評價' icon='movie' label='商品評價')
          q-tab-panels(v-model="tab" animated swipeable transition-prev="jump-up" transition-next="jump-up").q-pa-xl
            q-tab-panel(name="商品說明")
              .text-body1.q-px-xl {{description}}
            q-tab-panel(name="商品規格")
              .text-body1.q-px-xl {{detail}}
            q-tab-panel(name="商品評價")
              .text-body1.q-px-xl

</template>

<script>
export default {
  name: 'AdminProductBuy',
  data () {
    return {
      name: '',
      price: '',
      description: '',
      detail: '',
      image: '',
      sell: true,
      amount: 0,
      tab: '商品說明'
    }
  },
  computed: {
    amountstate () {
      return this.amount === 0 ? null : this.amount > 0
    }
  },
  methods: {
    async addcart () {
      if (!this.amountstate) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '商品數量必須 > 0'
        })
        return
      }

      if (this.$store.state.user.jwt.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先登入'
        })
        return
      }

      try {
        await this.axios.post('/users/cart', { product: this.$route.params.id, amount: this.amount }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$swal({
          title: '加入購物車成功!你是否要前往結帳?',
          icon: 'success',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: '前往結帳',
          denyButtonText: '繼續購物'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal('感謝您祝您購物愉快', '', 'success', this.$router.push('/cart'))
          } else if (result.isDenied) {
            this.$swal('歡迎回來繼續購物', '', 'success', this.$router.push('/adminProduct'))
          }
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '加入購物車失敗'
        })
      }
    },
    async addFavorite () {
      // 登入都會給一個簽證 token, 若沒有代表沒登入, return 即沒有登入的話函式 addcart () 會在這裡停住不會繼續往下執行
      if (this.$store.state.user.jwt.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先登入'
        })
        return
      }

      // 上面兩個都通過要執行的事
      try {
        // 這裡沒有路由設定, 所以應該用 this.product._id, 將要丟進購物車的商品的 ._id 和 amount 新增進後台 models users 裡的 cart
        // product 是將這個 componenets 引進的 /pages/front/NewProduct 裡將 products 全部商品資料陣列跑迴圈列出每一項單個商品 JSON, v-for="product in products" 的 product
        // this.$route.params.id 可以將儲存在後台路由加在路徑後面的 :id 給取出來, 這裡是用商品 _id 加在網址後面, 所以 :id 就是商品 _id
        await this.axios.post('/users/favorite', { product: this.$route.params.id }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '成功加入收藏清單'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '此商品已在收藏清單內'
        })
        console.log(error)
      }
    }
  },
  // 後台 controllers products getProduct
  async mounted () {
    try {
      // 前台送出請求, 並將前台加在網址後的東西取出來
      const { data } = await this.axios.get('/products/' + this.$route.params.id)

      this.name = data.result.name
      this.price = data.result.price
      this.description = data.result.description
      this.detail = data.result.detail
      this.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
      this.sell = data.result.sell
      document.title = `iCom ${this.name} 購買頁面`
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
