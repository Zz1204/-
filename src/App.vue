<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <keep-alive :include="keepAlive">
      <router-view :key="$route.path" />
    </keep-alive>
    <div v-for="item in list" :key="item.path">
      <button  @click="to(item.path)">{{item.name}}</button>
      <div v-for="items in item.children" :key="items.path">
        <button  @click="to(items.path)">{{items.name}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'app',
  data() {
    return{
      list: []
    }
  },
  computed: {
    ...mapState({keepAlive: state => state.keepAlive})
  },
  methods: {
    addRouter() {

      this.$store.dispatch('addRouter').then(data => {
        console.log(this.$router.$packageRouter(data))
        this.list = data
        this.$router.addRoutes(this.$router.$packageRouter(data))
      })
    },
    to(path) {
      console.log(path)
      this.$router.push(path)
    }
  },
  created() {
    this.addRouter()
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
