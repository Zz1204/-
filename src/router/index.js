import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach(async (to, from, next) => {
  if(to.meta.keepAlive) {
    await store.commit('ADD_KEEP', to)
  }
  next()
})

function packageRouter(data) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    item.component = () => import(`../${item.componentPath}.vue`)
    if (item.keep) {
      item.meta = {
        keepAlive: true
      }
    }
    if (item.children) {
      packageRouter(item.children)
    }
  }

  return data
}



router.$packageRouter = packageRouter


export default router
