<template lang="pug">
  #q-app
    vue-page-transition(name="fade-in-right")
      router-view
</template>

<script>
export default {
  name: 'App'
}
