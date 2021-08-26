<template lang="pug">
  //- 管理者後台 layouts
  q-layout#adminManage.shadow-2.rounded-borders(view='lHh Lpr lff' container style='height:100vh')

    //- 標題欄位 -----------------------------------------------------------------------
    q-header#header.bg-cyan-8(elevated)
      q-toolbar
        q-btn(v-if="drawer" flat @click='drawer = !drawer' round dense icon='arrow_back')
        q-btn(v-if="!drawer" flat @click='drawer = !drawer' round dense icon='arrow_forward')
        q-toolbar-title 管理者後台

    //- 側邊欄位 -----------------------------------------------------------------------
    q-drawer#drawer(v-model='drawer' show-if-above :width='200' :breakpoint='700' side='left')
      //- 管理者資訊背景
      q-img.absolute-top(src='https://cdn.quasar.dev/img/material.png' style='height: 150px; width:100%')
        .absolute-bottom.bg-transparent
          //- 管理者大頭貼
          q-avatar.q-mb-sm(size='56px' )
            q-img(:src='this.image' style="height: 56px;")
          //- 管理者名稱
          .text-weight-bold {{this.account}}
          //- 管理者信箱
          div {{this.email}}

      //- 儀錶板
      q-scroll-area(style='height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd')
        q-list(padding)
          q-item(clickable v-ripple to='adminMemberManage')
            q-item-section(avatar)
              q-icon(name='inbox')
            q-item-section 會員資料

          q-item(clickable v-ripple to='adminOrderManage')
            q-item-section(avatar)
              q-icon(name='star')
            q-item-section 會員訂單管理

          q-item(clickable v-ripple to='adminProductManage')
            q-item-section(avatar)
              q-icon(name='send')
            q-item-section 商品管理

          q-item(clickable v-ripple to='/' style="color: black")
            q-item-section(avatar)
              q-icon(name='send')
            q-item-section 回到首頁

          q-item(clickable v-ripple @click="logout")
            q-item-section(avatar)
              q-icon(name='drafts')
            q-item-section 登出

    //- 網頁內容區 -----------------------------------------------------------------------
    q-page-container
      vue-page-transition(name="fade-in-right")
        router-view
</template>

<script>
export default {
  name: 'AdminManage',
  data () {
    return {
      drawer: false,
      image: '',
      account: '',
      email: ''
    }
  },
  methods: {
    async logout () {
      try {
        await this.axios.delete('/users/logout', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '登出成功'
        })
        // 呼叫 vuex 的登出, 將使用者資訊清空
        this.$store.commit('user/logout')
        if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '登出失敗'
        })
      }
    }
  },
  async mounted () {
    const { data } = await this.axios.get('/users/', {
      headers: {
        authorization: 'Bearer ' + this.$store.state.user.jwt.token
      }
    })
    this.$store.commit('user/getinfo', data.result)
    this.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
    this.account = data.result.account
    this.email = data.result.email
  }
}
</script>
