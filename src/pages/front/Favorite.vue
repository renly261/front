<template lang="pug">
  //- 購物車 pages
  q-page.q-pa-xl#favorite
    q-table( title="" :data="favorite" :columns="columns" row-key="_id" :filter="filter" grid hide-header)
      //- 搜尋
      template(v-slot:top-right)
        q-input(borderless dense debounce="300" v-model="filter" placeholder="Search")
          template(v-slot:append)
            q-icon(name="search")

      //- 商品卡片
      template#card(v-slot:item="props")
        .q-pa-md.col-xs-12.col-md-6
          q-card
            q-card-section.row
              .col-12.flex.justify-center
                q-img(:src='props.row.image')
              .col-12.flex.justify-center
                h5.text-center {{props.row.name}}
            q-card-section.row(style="width:100%")
              .col-6.flex.justify-center
                q-btn(@click="delFavorite(props.rowIndex)" rounded icon="delete" label="取消收藏")
              .col-6.flex.justify-center
                q-btn(@click="addcart(props.rowIndex)" rounded icon="add_shopping_cart" label="加入購物車" :state="amountstate")
            q-separator.row.q-my-md
            q-card-section#info.row
              .col-12
                .text-body1.flex.text-left {{ props.row.description }}

</template>

<script>
export default {
  name: 'Favorite',
  data () {
    return {
      filter: '',
      favorite: [],
      amount: 1,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: false
        },
        { name: 'amount', label: 'amount', field: 'amount', sortable: true },
        { name: 'price', label: 'price', field: 'price' }
      ]
    }
  },
  computed: {
    amountstate () {
      return this.amount === 0 ? null : this.amount > 0
    }
  },
  methods: {
    async addcart (index) {
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
        await this.axios.post('/users/cart', { product: this.favorite[index]._id, amount: this.amount }, {
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
    async delFavorite (index) {
      try {
        await this.axios.patch('/users/favorite', { product: this.favorite[index]._id, amount: 0 }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.favorite.splice(index, 1)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '刪除商品失敗'
        })
      }
    }
  },
  async mounted () {
    try {
      if (this.$store.state.user.jwt.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先登入'
        })
        if (this.$route.path !== '/') this.$router.push('/')
        return
      }
      const { data } = await this.axios.get('/users/favorite', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.user.jwt.token
        }
      })
      console.log(data.result)
      this.favorite = data.result.map(item => {
        item = { ...item.product, amount: item.amount }
        item.image = `${process.env.VUE_APP_API}/files/${item.image}`
        item.edit = false
        item.amountModel = item.amount
        return item
      })
      if (this.favorite.length < 1) {
        this.$swal({
          title: '目前收藏清單沒有東西，是否要去商品頁面 ?',
          icon: 'question',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: '前往商品頁面',
          denyButtonText: '不用了，謝謝'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal('快來加入你要收藏或比較的商品吧', '', 'success', this.$router.push('/adminProduct'))
          } else if (result.isDenied) {
            this.$swal('感謝您', '', 'success', this.$router.push('/'))
          }
        })
      }
    } catch (error) {
      // this.$swal({
      //   icon: 'error',
      //   title: '錯誤',
      //   text: '取得收藏清單失敗'
      // })
    }
  }
}
</script>
