<template lang="pug">
  //- 管理者訂單管理 pages
  q-page.q-pa-xl#adminOrderManage
    q-dialog(v-model="edit")
      q-card.my-card(flat bordered)
        h5.text-center 訂單編輯
        q-form(style="width:400px")
          q-card-section
            q-input(v-model="form.address" label="收貨地址")
          q-card-section
            q-select(outlined v-model="form.progress" :options="progress" label="訂單進度")
          q-card-section
            div.text-center
              q-btn(label="送出" type="submit" color="primary" v-close-popup @click="submitOrder")
              q-btn(label="關閉" type="reset" color="primary" flat v-close-popup).q-ml-sm

    q-table(title="訂單管理" :data="orders" :columns="columns" row-key="_id")
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="account" :props="props") {{props.row.user.account}}
          q-td(key="_id" :props="props") {{props.row._id}}
          q-td(key="date" :props="props") {{props.row.date}}
          q-td(key="address" :props="props") {{props.row.address}}
          q-td(key="progress" :props="props") {{props.row.progress}}
          q-td(key="products" :props="props")
            .row(v-for="info in props.row.products")
              hr
              .col-12
                q-img(:src='info.product.image' style="width: 30%")
              .col-12 {{info.product.name}}
              .col-12.col-md-6 {{info.product.price}}元
              .col-12.col-md-6 {{info.amount}}個
          q-td(key="edit" :props='props')
            q-btn-group(outline)
              q-btn(outline label='修改訂單' icon='' @click="editProduct(props.rowIndex)")
              q-btn(outline label='刪除訂單' icon='' @click='delOrder(props.rowIndex)')
</template>

<script>
export default {
  name: 'AdminOrderManage',
  data () {
    return {
      orders: [],
      edit: false,
      index: 0,
      form: {
        address: '',
        amount: 0,
        progress: '已收到訂單'
      },
      progress: [
        '已收到訂單', '備貨中', '出貨中'
      ],
      columns: [
        {
          name: 'account',
          required: true,
          label: '使用者名稱',
          align: 'center',
          field: 'account',
          sortable: true
        },
        { name: '_id', align: 'center', label: '訂單編號', field: '_id', sortable: true },
        { name: 'date', align: 'center', label: '訂單日期', field: 'date', sortable: true },
        { name: 'address', label: '收貨地址', field: 'address', align: 'center' },
        { name: 'progress', label: '訂單進度', field: 'progress', align: 'center' },
        { name: 'products', label: '訂單內容', field: 'products', align: 'center' },
        { name: 'edit', label: '管理訂單', field: 'edit', align: 'center' }
      ]
    }
  },
  methods: {
    // 刪除訂單, 將 index 傳入判斷要刪除的是陣列中的哪一筆訂單
    async delOrder (index) {
      try {
        // 路由後面 + this.orders[index]._id, 後台 routes 用 /orders/:id 將加在 orders 後面的東西用 :id 儲存起來, 後台可以用 req.params.id 取出來, 前台可以用 this.$route.params.id 取出來, :id 可以替換成任何變數, 例如 :abc 的話就是用 req.params.abc this.$route.params.abc 取出來
        await this.axios.delete('/users/orders/' + this.orders[index]._id, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.orders.splice(index, 1)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '刪除訂單失敗'
        })
        console.log(error)
      }
    },
    // 編輯訂單
    editProduct (index) {
      this.edit = true
      this.index = index
      this.$set(this.form, 'address', this.orders[index].address)
      this.$set(this.form, 'progress', this.orders[index].progress)
    },
    // 送出編輯訂單
    async submitOrder () {
      try {
        await this.axios.patch('/users/orders/' + this.orders[this.index]._id, this.form, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$set(this.orders[this.index], 'address', this.form.address)
        this.$set(this.orders[this.index], 'progress', this.form.progress)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '修改商品失敗'
        })
        console.log(error)
      }
    }
  },
  // 取得全部會員的訂單資料
  async mounted () {
    try {
      const { data } = await this.axios.get('/users/orders/all', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.user.jwt.token
        }
      }
      )
      console.log(data.result)
      this.orders = data.result.map(order => {
        order.date = new Date(order.date).toLocaleString()
        return order
      })
      for (const index of this.orders) {
        for (const index2 of index.products) {
          index2.product.image = `${process.env.VUE_APP_API}/files/${index2.product.image}`
        }
      }
    } catch (error) {
      console.log(error)
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得訂單失敗'
      })
    }
  }
}
</script>
