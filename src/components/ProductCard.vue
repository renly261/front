<template lang="pug">
  //- 商品資料包成卡片 componenets
  #productCard
    .row.items-start.q-gutter-md
      q-card#product.my-card
        //- 商品圖片
        //- 點擊商品卡片時 router-link 到根據不同商品的 _id 到不同商品的詳細購買頁面, 後面 product 是將這個 componenets 引進的 /pages/front/NewProduct 裡將 products 全部商品資料陣列跑迴圈列出每一項單個商品 JSON, v-for="product in products" 的 product, 用每一項商品在當初新增商品時 mongoose 給的 _id 來當作網址, 配合 router path: 'newProductBuy/:id' 來做到同一個 pages 裡根據後面網址 product._id 來顯示該 _id 的商品資料
        //- 這裡 to 連結到的網址後面加上商品的 _id, 先在 routes 裡 path: 'newProductBuy/:id' 去將網址後面加上的商品 _id 塞進 params, 在其他頁面就可以用 this.$route.params.id 去取得加在網址後面的東西, 也就是商品的 _id
        //- 這裡 router-link 相當於包一個 a 標籤, 只有在點擊圖片才連結到購買頁面, 避免在商品卡片上選數量或加入購物車也連到購買頁面
        router-link(:to="'/adminProductBuy/' + product._id" target="_blank")
          q-img(:src="product.image" title="查看更多資訊")
        //- 商品名稱
        q-card-section#name
          .row
            .col-12
              .text-h5.text-center {{product.name}}

        //- 商品價格 商品數量 加入購物車
        q-card-section
          .row
            .col-12
              .text-h5.text-center.text-red.q-mb-md $ {{product.price}}
            .col-12(style="width: 100%")
              q-form#form.flex
                q-input(type="number" v-model.number="amount" :state="amountstate" style="margin-right:auto" title="選擇商品數量")
                  template(v-slot:prepend)
                    q-icon(name="sell")
                q-btn(flat icon="add_shopping_cart" @click="addcart" title="加入購物車")
                q-btn(flat icon="favorite_border" @click="addFavorite" title="加入收藏清單")
</template>

<script>
export default {
  name: 'ProductCard',
  // 這裡會帶進你 import 這個 components 的那個頁面的資料, 例如這個 componenets 會被 /pages/front/NewProduct.vue import, 這裡的 product 就會是 NewProduct.vue v-for="product in products", 將所有商品資料的 products 跑迴圈迴出每一項單筆商品資料, 所以 html 就可以用 {{ data }} 顯示資料, 但還沒有商品數量所以下面 data 要寫一個 amount 放商品數量
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      amount: 0
    }
  },
  computed: {
    amountstate () {
      return this.amount === 0 ? null : this.amount > 0
    }
  },
  // 加入購物車
  methods: {
    async addcart () {
      // 驗證商品數量
      if (!this.amountstate) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '商品數量必須 > 0'
        })
        return
      }

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
        await this.axios.post('/users/cart', { product: this.product._id, amount: this.amount }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '成功加入購物車'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '加入購物車失敗'
        })
        console.log(error)
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
        await this.axios.post('/users/favorite', { product: this.product._id, amount: 1 }, {
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
  }
}
</script>
