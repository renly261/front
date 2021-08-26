<template lang="pug">
  //- 關於我們 pages
  q-page#about
    .row#aboutContent.q-mt-xl
      .col-12.flex
        h3.flex.justify-center(style="width:100%") 關於 iCom
        q-img.flex.justify-center(src='~assets/about1.jpg')
        h5.aboutText.flex.justify-center.text-center.q-mt-xl(style="width:100%") 本著提供消費者更便利的生活， iCom 購物網於 94 年八月正式開站。藉由網路搜尋資訊的便利性及商品訂購的快速性，將 iCom 購物網的服務迅速且全面的送到消費者面前。 iCom  購物網致力與顧客共創最佳消費經驗的線上購物平台。iCom 購物網的網站標誌以水藍色為主色系，傳遞科技與速度的印象。並將 iCom 的 i 字造型以閃電的流線色塊呈現出 i 的張力，藉以表現 iCom 購物網的新生命力。
    .row.q-mb-xl
        .col-12.flex
          h3.flex.justify-center(style="width:100%") 聯絡方式
        .col-12.embed-responsive.embed-responsive-16by9.flex.justify-center
          iframe(src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14458.814597305804!2d121.4195156!3d25.0441293!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa639904a89f26435!2z5Yue5YuV6YOo5Yue5YuV5Yqb55m85bGV572y5YyX5Z-65a6c6Iqx6YeR6aas5YiG572y5rOw5bGx6IG35qWt6KiT57e05aC0!5e0!3m2!1szh-TW!2stw!4v1622689237931!5m2!1szh-TW!2stw' style='border:0;' allowfullscreen loading='lazy')
          .text-body1.flex.justify-center.text-center.q-mt-xl(style="width:100%") 延保客服專線：0800-408-888
          .text-body1.flex.justify-center.text-center.q-mt-xl(style="width:100%") 傳真：07-236-6221#998
          .text-body1.flex.justify-center.text-center.q-mt-xl(style="width:100%") 購物網相關服務請洽：07-236-6221#925,928
          .text-body1.flex.justify-center.text-center.q-mt-xl(style="width:100%") 服務時間：週一至週五 AM09:00~12:30-PM1:30~6:00
          .text-body1.flex.justify-center.text-center.q-mt-xl(style="width:100%") 購物網相關服務請洽：07-236-6221#925,928
          .text-body1.flex.justify-center.text-center.q-mt-xl(style="width:100%") 地址：243新北市泰山區貴子里致遠新村55之1號
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      slide: 'first'
    }
  }
}
</script>
