<template lang="pug">
  //- 首頁 pages
  q-page#home
    .row#carousel
      //- 輪播圖 -------------------------------------------------------------------------------------------
      .col-12
        q-carousel(arrows animated v-model='slide' height='calc(100vh - 60px)' )
          q-carousel-slide(name='first' img-src='~assets/amd.jpg')
            .absolute-bottom.custom-caption
              .text-h2 AMD Ryzen 5700G、5600G 正式上市 !
              .text-subtitle1 Zen 3 搭 Vega 最強遊戲內顯 APU，採用 Zen 3 + Vega 組合的 AMD Ryzen 5000G 系列 APU 處理器，將有著首款 8 核心、8 CU 的 Ryzen 7 5700G 與中階的 6 核心、7 CU 配置的 Ryzen 5 5600G，並於 8/5 日正式販售
          q-carousel-slide(name='second' img-src='~assets/asus.jpg')
            .absolute-bottom.custom-caption
              .text-h2 Alan Walker 重磅聯名！華碩電競筆電開賣
              .text-subtitle1 華碩（ASUS）旗下電競品牌 ROG 玩家共和國於（8/19）舉辦線上《ROG x Alan Walker: Join the Republic, Join the Walkers》全球發表會，與知名天才電音 DJ－Alan Walker 共同宣布聯名新機「ROG Zephyrus G14 AW SE」開賣！「ROG Zephyrus G14 AW SE」搭載最新八核心 AMD Ryzen 9 5900HS 處理器與 NVIDIA GeForce RTX 3050 Ti 顯示卡，將強大運算能力納入 14 吋輕薄機身。
          q-carousel-slide(name='third' img-src='~assets/aorus.jpg')
            .absolute-bottom.custom-caption
              .text-h2 技嘉推出AORUS電競主機，兼具低溫、低噪、高效能
              .text-subtitle1 技嘉科技首次推出INTEL®及AMD平台的全塔式AORUS MODEL X及迷你塔式AORUS MODEL S兩款電競主機，以目前市場上最頂尖的用料及週邊配置，加上技嘉嚴密的測試及專業的技術加持，提供高效能高品質的電腦主機選擇。
    //- 最新消息 -------------------------------------------------------------------------------------------
    .row#news.q-mt-xs.q-px-xl.q-col-gutter-xl
      .col-12
        h2.text-center 最新消息

      q-intersection( transition="slide-right").col-12.col-md-6.flex.items-center.justify-center
        q-card.my-card(flat bordered)
          q-card-section(horizontal)
            q-card-section.col-6.flex.flex-center
              q-img.rounded-borders(src='~assets/intel.jpg')
            q-card-section.q-pt-xs.flex.items-center
              .text-h5.q-mt-sm.q-mb-xs Intel Arc Xe HPG Alchemist GPU採台積電6nm製程，支援Display Port 2.0
              .text-caption.text-grey Intel 於 Architecture Day 2021（2021 架構日）揭露代號 Alchemist 的 Xe HPG 架構 GPU 細節與未來發展藍圖，同時確認初代產品採用台積電 6nm 製程。Intel 決定以 Xe Core 做為基礎單位，取代過往採用的 EU（Execution Unit，執行單元）。每組 Xe Core 由 16 個向量引擎 (256 bit) 和 16 個矩陣引擎 (1024 bit) 組成
          q-separator
          q-card-actions.flex.justify-end
            q-btn(flat round icon='event')
            q-btn(flat) 2021/08/19
            a(href="https://www.4gamers.com.tw/news/detail/49586/ntel-xe-hpg-alchemist-gpu-detailed-built-on-tsmc-6nm-and-support-displayport-2-0" target="_blank")
              q-btn(flat color='primary') Read More ...

      q-intersection( transition="slide-right").col-12.col-md-6.flex.items-center.justify-center
        q-card.my-card(flat bordered)
          q-card-section(horizontal)
            q-card-section.col-6.flex.flex-center
              q-img.rounded-borders(src='~assets/aorus1.jpg')
            q-card-section.q-pt-xs.flex.items-center
              .text-h5.q-mt-sm.q-mb-xs 技嘉X570S AORUS MASTER主機板測試－靜冷無噪音，大師就是不同凡響
              .text-caption.text-grey 作為 AMD 目前最高階主機板系列的 X570 都需要主動式散熱協助，近期改款推出 X570 晶片組，透過重新規劃線路設計降低功耗，不再需要主動風扇幫助散熱，被動散熱片的面積也不用太大，完全零噪音。技嘉 GIGABYTE 的 X570S AORUS MASTER，在處理器供電、散熱、網路晶片、USB 傳輸都有升級，究竟有哪些進化呢？請透過我們的測試來瞭解這張主機板。
          q-separator
          q-card-actions.flex.justify-end
            q-btn(flat round icon='event')
            q-btn(flat) 2021/08/20
            a(href="https://www.4gamers.com.tw/news/detail/49590/gigabyte-x570s-aorus-master-motherboard-review0" target="_blank")
              q-btn(flat color='primary') Read More ...

      q-intersection( transition="slide-right").col-12.col-md-6.flex.items-center.justify-center.q-mt-xl
        q-card.my-card(flat bordered)
          q-card-section(horizontal)
            q-card-section.col-6.flex.flex-center
              q-img.rounded-borders(src='~assets/msi.jpg')
            q-card-section.q-pt-xs.flex.items-center
              .text-h5.q-mt-sm.q-mb-xs 微星Radeon RX 6600 XT GAMING X評測：非光追的1080p遊戲強棒
              .text-caption.text-grey AMD 針對中階市場推出 Radeon RX 6600 XT GPU，主攻 1080p 玩家客群，售 US$ 379 起。由於並未提供公版卡，接下來我們以微星 Radeon RX 6600 XT GAMING X（定價 NT$ 13,990）做為主角，一起來看看它的效能表現吧。Radeon RX 6600 XT 使用的 Navi 23 XT GPU 擁有 32 組運算單元（CU）
          q-separator
          q-card-actions.flex.justify-end
            q-btn(flat round icon='event')
            q-btn(flat) 2021/08/11
            a(href="https://www.4gamers.com.tw/news/detail/49459/msi-radeon-rx-6600-xt-gaming-x-review" target="_blank")
              q-btn(flat color='primary') Read More ...

      q-intersection( transition="slide-right").col-12.col-md-6.flex.items-center.justify-center.q-mt-xl
        q-card.my-card(flat bordered)
          q-card-section(horizontal)
            q-card-section.col-6.flex.flex-center
              q-img.rounded-borders(src='~assets/beQuiet.jpg')
            q-card-section.q-pt-xs.flex.items-center
              .text-h5.q-mt-sm.q-mb-xs 超穩定輸出—be quiet! PURE POWER 11 FM 650W金牌全模組電源供應器
              .text-caption.text-grey be quiet! 是許多玩家的最愛，安靜的同時又可以兼顧效能表現，近期品牌推出 PURE POWER 11 FM 系列電源供應器，通過 80PLUS 金牌認證，提供最高 93.9％ 高轉換效率，PURE POWER 11 FM 系列提供 550W／650W／750W 三種功率，讓不同需求的玩家都能滿足，線材採用全模組化設計，機殼內部更為簡潔，安全保護機制也非常完整

          q-separator
          q-card-actions.flex.justify-end
            q-btn(flat round icon='event')
            q-btn(flat) 2021/08/20
            a(href="https://www.4gamers.com.tw/news/detail/49590/gigabyte-x570s-aorus-master-motherboard-review0" target="_blank")
              q-btn(flat color='primary') Read More ...

    //- 電腦指南 -------------------------------------------------------------------------------------------
    .row#info.q-ma-xl.q-col-gutter-xl
      .col-12
        h2.text-center 電腦指南

      .col-12.flex.justify-center
        q-card.my-card.q-pa-xl(bordered flat)
          .text-h4.text-center.q-mt-lg 【Proladon】快速了解電腦 (Ver.2)
            q-card-section.q-mt-lg
              q-video.rounded-borders(src="https://www.youtube.com/embed/KBNYqMNdmyw" :ratio="16/9")

      .col-12.flex.justify-center
        q-card.my-card.q-pa-xl(bordered flat)
          .text-h4.text-center.q-mt-lg 【Huan】 買套裝機好? 還是自己組划算??
            q-card-section.q-mt-lg
              q-video.rounded-borders(src="https://www.youtube.com/embed/x6deM5RbnLE" :ratio="16/9")

      .col-12.flex.justify-center
        q-card.my-card.q-pa-xl(bordered flat)
          .text-h4.text-center.q-mt-lg 【Huan】 如何DIY一台AMD的電競電腦? 電腦組裝、理線、一體式水冷安裝分享!
            q-card-section.q-mt-lg
              q-video.rounded-borders(src="https://www.youtube.com/embed/xiAH9JY-Ryg" :ratio="16/9")

      .col-12.flex.justify-center.q-mb-xl
        q-card.my-card.q-pa-xl(bordered flat)
          .text-h4.text-center.q-mt-lg 【聊電Jing】買完電腦零件後一定要養成的好習慣!
            q-card-section.q-mt-lg
              q-video.rounded-borders(src="https://www.youtube.com/embed/_ciiijhpZMg" :ratio="16/9")

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      slide: 'first'
    }
  },
  components: {
  }
}
</script>
