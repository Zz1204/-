<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <input type="text" v-model="input"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      input: '',
      isFirst: true
    }
  },
  created() {
    this.isFirst = false
    console.log('created')
    this.onLoad();
  },
  activated() {
    console.log('activated')
  },
  deactivated() {
    console.log('deactivated')
  },
  beforeRouteEnter  (to, from, next) {
    if(from.meta.isOnload) {
      from.meta.isOnload = false
      next(vm => {
        !vm.isFirst && vm.onLoad()
      })
    }
    next()
  },
  methods: {
    onLoad() {
      console.log('刷新，onLoad')
      this.input = '111111111111'
    }
  }
}
</script>
