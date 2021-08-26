<template lang="pug">
  //- 管理者商品管理 pages
  q-page#adminProductManage
    .row.q-pa-xl
      .col
        q-table(title='商品編輯' :data='products' :columns='columns' row-key='_id' :filter="filter" binary-state-sort)

          //- 表格內容 ------------------------------------------------------------------------------
          template#table(v-slot:body="props")
            q-tr(:props='props')
              //- 商品名稱
              q-td.cursor-pointer(key='name' :props='props' @click="editProduct(props.rowIndex)") {{props.row.name}}
                q-popup-edit(v-model='props.row.name' title="商品名稱" anchor= "top start")
                  q-form
                    q-input(v-model='form.name' dense autofocus counter )
                    q-btn(label="送出" type="submit" outline v-close-popup @click="submitModal")
                    q-btn(label="關閉" type="reset"  outline v-close-popup ).q-ml-sm

              //- 商品說明
              q-td.cursor-pointer#description(key='description' :props='props' @click="editProduct(props.rowIndex)") 點我編輯
                q-popup-edit(v-model='props.row.description' title="商品說明" anchor= "top start")
                  q-form
                    q-input(v-model='form.description' dense autofocus counter type="textarea")
                    q-btn(label="送出" type="submit" outline v-close-popup @click="submitModal")
                    q-btn(label="關閉" type="reset"  outline v-close-popup ).q-ml-sm

              //- 商品規格
              q-td.cursor-pointer#detail(key='detail' :props='props' @click="editProduct(props.rowIndex)") 點我編輯
                q-popup-edit(v-model='props.row.detail' title="商品規格" anchor= "top start")
                  q-form
                    q-input(v-model='form.detail' dense autofocus counter type="textarea")
                    q-btn(label="送出" type="submit" outline v-close-popup @click="submitModal")
                    q-btn(label="關閉" type="reset"  outline v-close-popup ).q-ml-sm

              //- 商品價格
              q-td.cursor-pointer(key='price' :props='props' @click="editProduct(props.rowIndex)") {{props.row.price}}
                q-popup-edit(v-model='props.row.price' title="商品價格" anchor= "top right")
                  q-form
                    q-input(v-model='form.price' dense autofocus counter type="number")
                    q-btn(label="送出" type="submit" outline v-close-popup @click="submitModal")
                    q-btn(label="關閉" type="reset"  outline v-close-popup ).q-ml-sm

              //- 商品品牌
              q-td.cursor-pointer(key='brand' :props='props' @click="editProduct(props.rowIndex)") {{props.row.brand}}
                q-popup-edit(v-model='props.row.brand' title="商品品牌" anchor= "top start")
                  q-form
                    q-select.q-mb-md(outlined v-model="form.brand" :options="brand" label="商品品牌")
                    q-btn(label="送出" type="submit" outline v-close-popup @click="submitModal")
                    q-btn(label="關閉" type="reset"  outline v-close-popup ).q-ml-sm

              //- 商品類別
              q-td.cursor-pointer(key='cate' :props='props' @click="editProduct(props.rowIndex)") {{props.row.cate}}
                q-popup-edit(v-model='props.row.cate' title="商品類別" anchor= "top start")
                  q-form
                    q-select.q-mb-md(outlined v-model="form.cate" :options="cate" label="商品品牌")
                    q-btn(label="送出" type="submit" outline v-close-popup @click="submitModal")
                    q-btn(label="關閉" type="reset"  outline v-close-popup ).q-ml-sm

              //- 商品圖片
              q-td(key='image' :props='props' @click="editProduct(props.rowIndex)")
                img.cursor-pointer(:src="props.row.image" style="height:100px; width: 100px;")
                q-popup-edit(v-model='props.row.image' title="商品圖片" anchor= "top right")
                  q-form
                    img-inputer(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改")
                    div.text-center
                      q-btn(label="送出" type="submit" outline v-close-popup @click="submitModal")
                      q-btn(label="關閉" type="reset"  outline v-close-popup ).q-ml-sm

              //- 商品上架
              q-td.cursor-pointer(key='sell' :props='props' @click="editProduct(props.rowIndex)")
                .text-body(v-if="props.row.sell") 上架中
                .text-body(v-if="!props.row.sell") 下架中
                q-popup-edit(v-model='props.row.sell' title="商品上下架" anchor= "top left")
                    q-form
                      q-btn-toggle(v-model="form.sell" rounded no-caps unelevated toggle-color="primary" :options="[{label: '上架', value: 'true'}, {label: '下架', value: 'false'}]")
                      div.q-mt-md.text-center
                        q-btn(label="送出" type="submit" outline v-close-popup @click="submitModal")
                        q-btn(label="關閉" type="reset" outline v-close-popup ).q-ml-sm

          //- 新增商品表單 ------------------------------------------------------------------------------
          template#form(v-slot:top-right)
            //- 新增商品按鈕
            q-btn.q-mr-xl(color='primary' :disable='loading' label='新增商品' @click="add = true" )
            //- 彈出對話框
            q-dialog(v-model="add")
              q-card.my-card.q-py-md(flat bordered)
                //- 商品上架表單
                q-form().q-gutter-xl
                    h5.text-center.q-pt-md 新增商品
                    //- 新增商品名稱
                    q-card-section
                      q-input(filled
                              v-model="form.name"
                              label="商品名稱"
                              )

                    //- 新增商品說明
                    q-card-section
                      q-input(filled
                              v-model="form.description"
                              label="商品說明"
                              type="textarea"
                              )

                    //- 新增商品規格
                    q-card-section
                      q-input(filled
                              v-model="form.detail"
                              label="商品規格"
                              type="textarea"
                              )

                    //- 新增商品價格
                    q-card-section
                      q-input(filled
                              v-model="form.price"
                              label="商品價格"
                              type="number"
                              )

                    //- 新增商品圖片
                    q-card-section
                      .q-gutter-xl.text-center
                        //- 圖片上傳
                        img-inputer(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改")

                    //- 新增商品品牌
                    q-card-section
                      q-select(outlined v-model="form.brand" :options="brand" label="商品品牌")

                    //- 新增商品類別
                    q-card-section
                      q-select(outlined v-model="form.cate" :options="cate" label="商品類別")

                    //- 新增商品上下架
                    q-card-section
                      q-td(key="sell")
                      div.text-center
                        q-toggle(v-model="form.sell" label="是否上架")

                    //- 送出重寫按鈕
                    q-card-section
                      div.text-center
                        q-btn(label="送出" type="submit"  outline v-close-popup @click="submitModal")
                        q-btn(label="重寫" type="reset"  outline @click="reset" ).q-ml-sm

            //- 搜尋
            q-input#search(borderless dense debounce="300" v-model="filter" placeholder="Search")
              template(v-slot:append)
                q-icon(name="search")
</template>

<script>
export default {
  name: 'AdminProductManage',
  data () {
    return {
      // 彈出視窗 q-dialog
      add: false,
      edit: false,
      submitDisable: false,
      loading: false,
      // q-table 篩選
      filter: '',
      brand: [
        '華碩', '技嘉', '微星'
      ],
      cate: [
        '主機板', '顯示卡', '筆記型電腦', '套裝電腦'
      ],
      // 所有商品資料 Json 丟進這個 products 陣列
      products: [],
      // tHead
      columns: [
        { name: 'name', label: '商品名稱', align: 'center', sortable: true, field: row => row.name, format: val => `${val}` },
        { name: 'description', align: 'center', label: '商品說明', field: 'description', sortable: false, style: 'width:500px' },
        { name: 'detail', align: 'center', label: '商品規格', field: 'detail', sortable: false, style: 'width:500px' },
        { name: 'price', align: 'center', label: '商品價格', field: 'price', sortable: true },
        { name: 'brand', align: 'center', label: '商品品牌', field: 'brand', sortable: true },
        { name: 'cate', align: 'center', label: '商品類別', field: 'cate', sortable: true },
        { name: 'image', align: 'center', label: '商品圖片', field: 'image', sortable: false },
        { name: 'sell', label: '商品上架', align: 'center', field: 'sell', sortable: true }
      ],
      // 表單要輸入儲存哪些資料
      form: {
        name: '',
        price: 0,
        description: '',
        detail: '',
        image: 'null',
        brand: '',
        cate: '',
        sell: true,
        _id: ''
      }
    }
  },
  methods: {
    // 送出表單
    async submitModal () {
      this.submitDisable = true
      try {
        // 若要上傳檔案或圖片等, 要將資料格式轉成 form-data
        const fd = new FormData()
        for (const key in this.form) {
          fd.append(key, this.form[key])
        }
        // 新增商品
        if (this.form._id.length === 0) {
          await this.axios.post('/products', fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.user.jwt.token
            }
          })
          this.form = {
            name: '',
            price: 0,
            description: '',
            detail: '',
            image: 'null',
            brand: '',
            cate: '',
            sell: true,
            _id: ''
          }
          // 更新商品
        } else {
          const { data } = await this.axios.patch('/products/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.user.jwt.token
            }
          })
          // json 包在陣列裡面，你直接改 vue 不會偵測到就需要用 $set
          // this.$set(this.你要改的Json, '你要改的Json 的屬性', 你要改的Json 的值)
          this.$set(this.products[this.form.index], 'name', this.form.name)
          this.$set(this.products[this.form.index], 'price', this.form.price)
          this.$set(this.products[this.form.index], 'description', this.form.description)
          this.$set(this.products[this.form.index], 'detail', this.form.detail)
          this.$set(this.products[this.form.index], 'brand', this.form.brand)
          this.$set(this.products[this.form.index], 'cate', this.form.cate)
          this.$set(this.products[this.form.index], 'image', `${process.env.VUE_APP_API}/files/${data.result.image}`)
          this.$set(this.products[this.form.index], 'sell', this.form.sell)
          this.$set(this.products[this.form.index], '_id', this.form._id)
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '上傳錯誤'
        })
        console.log(error)
      }
      this.submitDisable = false
    },
    // 編輯時抓出該陣列的資料(products)放進表單(form)裡, 再用上面送出表單更新該陣列的資料(products), 顯示在上方 q-table(:data='products')
    // 用 index 去判斷現在是第幾個陣列, 相當於陣列的索引
    editProduct (index) {
      this.edit = true
      this.$set(this.form, 'name', this.products[index].name)
      this.$set(this.form, 'price', this.products[index].price)
      this.$set(this.form, 'description', this.products[index].description)
      this.$set(this.form, 'detail', this.products[index].detail)
      this.$set(this.form, 'brand', this.products[index].brand)
      this.$set(this.form, 'cate', this.products[index].cate)
      this.$set(this.form, 'sell', this.products[index].sell)
      this.$set(this.form, 'image', this.products[index].image)
      this.$set(this.form, '_id', this.products[index]._id)
      this.$set(this.form, 'index', index)
      console.log(this.form)
    },
    // 重置表單
    reset (event) {
      if (this.submitDisable) {
        event.preventDefault()
        return
      }
      this.form = {
        name: '',
        price: 0,
        description: '',
        detail: '',
        image: 'null',
        brand: '',
        cate: '',
        sell: false,
        _id: ''
      }
    }
  },
  // 取得全部商品資訊
  // 後台 controllers products getAllProduct
  async mounted () {
    try {
      const { data } = await this.axios.get('/products/all', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.user.jwt.token
        }
      })
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
