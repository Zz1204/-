<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="delHome">删除home缓存(通过vue-devtool查看)</button>
    <button @click="backHome">回到home触发刷新</button>


  </div>
</template>
<script>

  export default {
    name: 'About',
    data() {
      return {
        list: []
      }
    },
    methods: {
      delHome() {
        this.$store.commit('DEL_KEEP', 'Home')
      },
      backHome() {
        this.$route.meta.isOnload = true
        this.$router.replace('/')
      },

    }

  }
</script>
