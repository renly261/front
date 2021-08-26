<template lang="pug">
  //- 購物車 pages
  q-page.q-pa-xl#cart
    q-table( title="購物車" :data="cart" :columns="columns" row-key="_id" :filter="filter" grid hide-header)
      //- 搜尋
      template(v-slot:top-right)
        q-input(borderless dense debounce="300" v-model="filter" placeholder="Search")
          template(v-slot:append)
            q-icon(name="search")

      //- 商品卡片
      template(v-slot:item="props")
        .q-pa-md.col-xs-12.col-md-6.col-lg-4
          q-card(:class="props.selected ? 'bg-grey-2' : ''")
            q-card-section
              .row
                .col-12
                  q-img.q-mt-xl(:src='props.row.image')
              .row#name
                .col-12
                  h4.q-mt-xl.text-center 商品名稱 : {{props.row.name}}
              .row
                .col-6.flex.justify-center
                  q-form
                    q-select(type="number" v-model.number="props.row.amountModel" :rules="[val => val > 0 || '商品數量必須大於0']" filled label='購買數量' @input="edit(props.rowIndex)" :options="options" style="width:150px")

                .col-6.flex.justify-center
                  h5#price.text-center $ {{ props.row.price }}

              .row
                .col-6.flex.justify-center
                  q-btn(v-if="cart[props.rowIndex].edit == true" outline @click="submitProduct(props.rowIndex)" label="確認數量")
                .col-6.flex.justify-center
                  q-btn(outline @click="delProduct(props.rowIndex)" label="刪除商品")

    //- 總金額 結帳
    .row.q-ma-md#check
      .col-12.flex
        h5 總金額 : {{ totalprice }}
      .col-12.flex
        q-btn(@click="checkout" label="確認結帳" rounded push)

</template>

<script>
export default {
  name: 'Cart',
  data () {
    const options = []
    for (let i = 0; i <= 10; i++) {
      options.push(i)
    }
    return {
      filter: '',
      model: null,
      options: Object.freeze(options),
      cart: [],
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
    totalprice () {
      return this.cart.length === 0 ? 0 : this.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.price), 0)
    }
  },
  methods: {
    edit (index) {
      this.cart[index].edit = true
    },
    async delProduct (index) {
      try {
        await this.axios.patch('/users/cart', { product: this.cart[index]._id, amount: 0 }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.cart.splice(index, 1)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '刪除商品失敗'
        })
      }
    },
    // 送出編輯
    async submitProduct (index) {
      try {
        await this.axios.patch('/users/cart', { product: this.cart[index]._id, amount: this.cart[index].amountModel }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$set(this.cart[index], 'amount', this.cart[index].amountModel)
        this.$set(this.cart[index], 'edit', false)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '修改商品失敗'
        })
        console.log(this.cart[index].amountModel)
      }
    },
    // 結帳
    async checkout () {
      try {
        await this.axios.post('/users/checkout/', {}, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '結帳成功,感謝您的光臨'
        })
        this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '結帳失敗'
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
      const { data } = await this.axios.get('/users/cart', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.user.jwt.token
        }
      })
      this.cart = data.result.map(item => {
        item = { ...item.product, amount: item.amount }
        item.image = `${process.env.VUE_APP_API}/files/${item.image}`
        item.edit = false
        item.amountModel = item.amount
        return item
      })
      // 登入都會給一個簽證 token, 若沒有代表沒登入, return 即沒有登入的話函式 addcart () 會在這裡停住不會繼續往下執行

      if (this.cart.length < 1) {
        this.$swal({
          title: '目前購物車沒有東西，是否要去商品頁面 ?',
          icon: 'question',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: '前往商品頁面',
          denyButtonText: '不用了，謝謝'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal('祝您購物愉快', '', 'success', this.$router.push('/adminProduct'))
          } else if (result.isDenied) {
            this.$swal('眾多商品歡迎參考看看', '', 'success', this.$router.push('/'))
          }
        })
      }
    } catch (error) {
      // this.$swal({
      //   icon: 'error',
      //   title: '錯誤',
      //   text: '取得購物車失敗'
      // })
    }
  }
}
</script>
