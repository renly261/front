<template lang="pug">
  //- 管理者商品 pages
  q-page#adminProduct
    //- 右邊欄
    q-drawer#productDrawer(v-model='drawer' show-if-above :mini='miniState' @mouseover='miniState = false' @mouseout='miniState = true' :width='250' :breakpoint='400' bordered content-class='bg-grey-3' side='right')
      q-scroll-area.fit
        q-list(padding)
          q-item(clickable v-ripple)
            q-item-section(avatar) 品牌
              q-icon(name='inbox')
            q-item-section
              q-list
                q-item(tag="label" v-ripple)
                  q-item-section(avatar)
                    q-radio( v-model="brand" val="全部品牌" ) 全部

                q-item(tag="label" v-ripple)
                  q-item-section(avatar)
                    q-radio( v-model="brand" val="華碩" ) 華碩

                q-item(tag="label" v-ripple)
                  q-item-section(avatar)
                    q-radio(v-model="brand" val="技嘉" ) 技嘉

                q-item(tag="label" v-ripple)
                  q-item-section(avatar)
                    q-radio(v-model="brand" val="微星" ) 微星

          q-separator
          q-item(clickable v-ripple)
            q-item-section(avatar) 類別
              q-icon(name='category')
            q-item-section
              q-list
                q-item(tag="label" v-ripple)
                  q-item-section(avatar)
                    q-radio(v-model="brand" val="全部類別" ) 全部

                q-item(tag="label" v-ripple)
                  q-item-section(avatar)
                    q-radio(v-model="brand" val="主機板" ) 主機板

                q-item(tag="label" v-ripple)
                  q-item-section(avatar)
                    q-radio(v-model="brand" val="顯示卡" ) 顯示卡

                q-item(tag="label" v-ripple)
                  q-item-section(avatar)
                    q-radio(v-model="brand" val="筆記型電腦" ) 筆記型電腦

                q-item(tag="label" v-ripple)
                  q-item-section(avatar)
                    q-radio(v-model="brand" val="套裝電腦" ) 套裝電腦
          q-separator
          q-item(clickable v-ripple)
            q-item-section(avatar) 價格
              q-icon(name='paid')
            q-item-section
              q-list
                q-input(v-model="min" label="最小值" outlined)
                q-input.q-my-lg(v-model="max" label="最大值" outlined)
                q-btn(@click="reset" label="重置")
    .row.q-px-xl
      //- 麵包屑
      .col-6.q-mt-xl#breadcrumbs
        q-breadcrumbs
          q-breadcrumbs-el(label="首頁" icon="home" to='/')
          q-breadcrumbs-el(label="最新商品" icon="widgets" to='/adminProduct')
          q-breadcrumbs-el {{brand}} / 價格區間 : ${{min}} ~ ${{max}}
      //- 資料筆數
      .col-6.flex.justify-end#count
        h6 總共 {{filter.length}} 筆商品
    //- 商品卡片, 用迴圈把所有上架的商品卡片列出來
    .row.q-pa-xl.q-col-gutter-xl
      //- 將 components 裡的 ProductCard 用迴圈跑並顯示出來
      .col-12.col-md-6.col-lg-4.col-xl-3#product( v-for="product in filter" :key="product._id" )
          ProductCard.cardFloat(:product="product")

</template>

<script>
import ProductCard from 'src/components/ProductCard.vue'
export default {
  name: 'AdminProduct',
  data () {
    return {
      products: [],
      // 側邊欄
      drawer: false,
      miniState: true,
      // radio 傳進來的值
      brand: [],
      min: 1,
      max: 99999
    }
  },
  components: {
    ProductCard
  },
  methods: {
    reset () {
      this.min = 1
      this.max = 99999
    }
  },
  computed: {
    filter () {
      return this.products.filter(item => {
        if (this.brand[0] == null && item.price < this.max && item.price > this.min) return true
        else if ((this.brand.includes(`${item.brand}`) || this.brand.includes(`${item.cate}`)) && (item.price > this.min && item.price < this.max)) return true
        else if ((this.brand.includes('全部品牌') || this.brand.includes('全部類別')) && (item.price > this.min && item.price < this.max)) return true
        else return false
      })
    }
  },
  // 取得使用者商品資料
  // mounted 只會在進入網頁或重新整理才會偵測一次, 所以要時刻更新的東西要寫在 vuex state 裡用 mutations 去修改值在到頁面上用 commit 去呼叫
  // 後台 controllers products getProduct
  async mounted () {
    try {
      const { data } = await this.axios.get('/products')
      this.products = data.result.map(product => {
        if (product.image) {
          product.image = `${process.env.VUE_APP_API}/files/${product.image}`
        }
        return product
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>
