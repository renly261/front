<template lang="pug">
  //- 管理者使用者管理 pages
  q-page.q-pa-xl#userMemberManage
    q-table(title="使用者管理" :data="users" :columns="columns" row-key="_id")
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="account" :props="props") {{props.row.account}}
          q-td(key="password" :props="props") {{props.row.password}}
          q-td(key="email" :props="props") {{props.row.email}}
          q-td(key="address" :props="props") {{props.row.address}}
          q-td(key="image" :props="props")
            q-img(:src='props.row.image' style="width:100%;")
          q-td(key="edit" :props="props")
            q-btn-group(outline)
              q-btn(outline label="編輯" @click="editProduct(props.rowIndex)")
              q-dialog(v-model="edit")
                q-card.my-card.q-py-md(flat bordered)
                  //- 使用者編輯表單
                  q-form().q-gutter-xl
                      h5.text-center.q-pt-md 編輯使用者
                      //- 編輯使用者帳號
                      q-card-section
                        q-input(filled
                                v-model="form.account"
                                label="使用者帳號"
                                required
                                hint="可以使用"
                                :error="!state.account"
                                error-message="帳號長度請在 4 ~ 20 個字之間"
                                )

                      //- 編輯使用者密碼
                      q-card-section
                        q-input(filled
                                v-model="form.password"
                                label="使用者密碼"
                                hint="可以使用"
                                :error="!state.password"
                                error-message="密碼長度請在 4 ~ 20 個字之間"
                                )

                      //- 編輯使用者信箱
                      q-card-section
                        q-input(filled
                                v-model="form.email"
                                label="使用者信箱"
                                required
                                :error="!state.email"
                                error-message="請輸入正確的信箱格式"
                                )

                      //- 編輯使用者地址
                      q-card-section
                        q-input(filled
                                v-model="form.address"
                                label="使用者地址"
                                )

                      //- 編輯使用者圖片
                      q-card-section
                        .q-gutter-xl.text-center
                          //- 圖片上傳
                          img-inputer(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳上傳使用者頭像" bottom-text="點擊或拖曳以修改")
                      //- 送出關閉按鈕
                      q-card-section
                        div.text-center
                          q-btn(label="送出" type="submit" color="primary" v-close-popup @click="submitModal")
                          q-btn(label="關閉" type="reset" color="primary" flat v-close-popup).q-ml-sm

</template>

<script>
import isEmail from 'validator/es/lib/isEmail'

export default {
  name: 'UserMemberManage',
  data () {
    return {
      users: [],
      edit: false,
      form: {
        account: '',
        password: '',
        email: '',
        address: '',
        image: 'null',
        role: ''
      },
      columns: [
        {
          name: 'account',
          required: true,
          label: '使用者名稱',
          align: 'center',
          field: 'account',
          sortable: true
        },
        { name: 'password', align: 'center', label: '使用者密碼', field: 'password', sortable: true },
        { name: 'email', align: 'center', label: '使用者信箱', field: 'email', sortable: true },
        { name: 'address', label: '收貨地址', field: 'address', align: 'center' },
        { name: 'image', label: '使用者頭像', field: 'image', align: 'center' },
        { name: 'edit', label: '使用者管理', field: 'edit', align: 'center' }
      ]
    }
  },
  computed: {
    // 驗證帳號密碼信箱
    state () {
      const account = this.form.account
      const password = this.form.password
      const email = this.form.email
      return {
        // 三原運算子語法, 判斷式 ? true 要執行的 : false 要執行的
        // 若 ? 前的判斷式是 ture 執行 : 前面, 若 ? 前的判斷式是 false 執行 : 後面
        // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
        // 以這個做例子就是使用者輸入帳號長度是 0 state.account 是空的, 若不是 0 state.account 會驗證帳號長度 4 ~ 20 字
        account: account.length === 0 ? null : account.length >= 4 && account.length <= 20,
        password: password.length === 0 ? null : password.length >= 4 && password.length <= 20,
        email: email.length === 0 ? null : isEmail(email)
      }
    }
  },
  methods: {
    // 編輯使用者
    editProduct (index) {
      this.edit = true
      this.$set(this.form, 'account', this.users[index].account)
      // this.$set(this.form, 'password', this.users[index].password)
      this.$set(this.form, 'email', this.users[index].email)
      this.$set(this.form, 'address', this.users[index].address)
      this.$set(this.form, 'image', this.users[index].image)
      this.$set(this.form, 'role', this.users[index].role)
      this.$set(this.form, '_id', this.users[index]._id)
      this.$set(this.form, 'index', index)
    },
    // 送出表單
    async submitModal () {
      try {
        // 若要上傳檔案或圖片等, 要將資料格式轉成 form-data
        const fd = new FormData()
        for (const key in this.form) {
          fd.append(key, this.form[key])
        }
        const { data } = await this.axios.patch('/users/edit' + this.form._id, fd, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        // json 包在陣列裡面，你直接改 vue 不會偵測到就需要用 $set
        // this.$set(this.你要改的Json, '你要改的Json 的屬性', 你要改的Json 的值)
        this.$set(this.users[this.form.index], 'account', this.form.account)
        this.$set(this.users[this.form.index], 'password', this.form.password)
        this.$set(this.users[this.form.index], 'email', this.form.email)
        this.$set(this.users[this.form.index], 'address', this.form.address)
        this.$set(this.users[this.form.index], 'image', `${process.env.VUE_APP_API}/files/${data.result.image}`)
        this.$set(this.users[this.form.index], 'role', this.form.role)
        this.$set(this.users[this.form.index], '_id', this.form._id)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '上傳錯誤'
        })
        console.log(error)
      }
    }
  },
  async mounted () {
    const { data } = await this.axios.get('/users', {
      headers: {
        authorization: 'Bearer ' + this.$store.state.user.jwt.token
      }
    })
    data.result.image = `http://localhost:3000/files/${data.result.image}`
    this.users.push(data.result)
  }
}
</script>
