<template lang="pug">
  //- 常見問題 pages
  q-page#question
    .row
      .col-12
        h3.text-center 常見問題 Q&A

    .row
      .col-12
        h4.text-center 會員問題

    .row
      .col-12.q-pa-xl.flex.justify-center
        q-list(bordered).rounded-borders
          q-expansion-item.rounded-borders(expand-separator icon="perm_identity" label="如何加入會員" caption="" )
            q-card
              q-card-section 點選左下方的會員專區 => 會員登入即可
      .col-12.q-pa-xl.flex.justify-center
        q-list(bordered).rounded-borders
          q-expansion-item.rounded-borders(expand-separator icon="perm_identity" label="註冊會員需要哪些資料" caption="" )
            q-card
              q-card-section 註冊會員有三個必填的資料，分別為帳號、密碼及電子信箱

      .col-12.q-pa-xl.flex.justify-center
        q-list(bordered).rounded-borders
          q-expansion-item.rounded-borders(expand-separator icon="perm_identity" label="如何修改個人資料" caption="" )
            q-card
              q-card-section 點選左下方的會員專區 => 使用者後台管理 => 個人資料即可，在這裡也可以新增或編輯您的地址和頭像

    .row
      .col-12
        h4.text-center 訂單問題

    .row
      .col-12.q-pa-xl.flex.justify-center
        q-list(bordered).rounded-borders
          q-expansion-item.rounded-borders(expand-separator icon="perm_identity" label="如何建立訂單" caption="" )
            q-card
              q-card-section 在商品頁面購買完後，在購物車內完成結帳動作即可建立當筆訂單
      .col-12.q-pa-xl.flex.justify-center
        q-list(bordered).rounded-borders
          q-expansion-item.rounded-borders(expand-separator icon="perm_identity" label="如何查詢訂單" caption="" )
            q-card
              q-card-section 查詢訂購內容請至【會員專區(需先登入) > 使用者訂單管理 > 訂單管理】，即可查詢訂購內容。

      .col-12.q-pa-xl.flex.justify-center
        q-list(bordered).rounded-borders
          q-expansion-item.rounded-borders(expand-separator icon="perm_identity" label="訂單可以做哪些修改" caption="" )
            q-card
              q-card-section 訂單成立後即無法作修改品項、數量 … 等，但可修改收貨地址或刪除訂單

    .row.q-mt-xl
      .col-12
        h3.text-center 購物流程
      .col-12.q-pa-xl.flex.justify-center
        q-stepper(v-model='step' vertical color='primary' animated )

          q-step(:name='1' title='先註冊會員' icon='settings' :done='step > 1' ) 填寫基本個人資料以便後續購物
            q-stepper-navigation
              q-btn(@click='step = 2' color='primary' label='下一步')

          q-step(:name='2' title='前往商品頁面' caption='' icon='create_new_folder' :done='step > 2') 在商品頁面挑選喜歡的商品，確認數量後加入購物車
            q-stepper-navigation
              q-btn(@click='step = 3' color='primary' label='下一步')
              q-btn.q-ml-sm(flat @click='step = 1' color='primary' label='返回')

          q-step(:name='3' title='購物車結帳' caption='' icon='create_new_folder' :done='step > 3') 前往購物車確認你結帳的及商品數量商品，確認完並且總金額無誤後即可結帳
            q-stepper-navigation
              q-btn(@click='step = 4' color='primary' label='下一步')
              q-btn.q-ml-sm(flat @click='step = 2' color='primary' label='返回')

          q-step(:name='4' title='確認訂單' icon='add_comment') 在會員專區 => 使用者後台管理 => 訂單管理可以看到你的訂單詳情，可以修改你的收貨地址或刪除該筆訂單
            q-stepper-navigation
              q-btn.q-ml-sm(flat @click='step = 3' color='primary' label='返回')

</template>

<script>
export default {
  name: 'Question',
  data () {
    return {
      step: 1
    }
  }
}
</script>
