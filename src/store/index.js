import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keepAlive: []
  },
  mutations: {
    ADD_KEEP: (state, actions) => {
      return new Promise((resolve, reject) => {
        let keep = [...state.keepAlive];
        let index = keep.findIndex(i => i === actions.name)
        if (index === -1) {
          keep.push(actions.name);
          state.keepAlive = keep;
        }


        resolve()
      })

    },

    DEL_KEEP: (state, actions) => {
      let keep = [...state.keepAlive];

      let index = keep.findIndex(i => i === actions);
      if (index !== -1) {
        keep.splice(index, 1);
        state.keepAlive = keep;
      }
    },


  },
  actions: {
    addRouter: ({commit}) => {
      return new Promise(resolve => {
        let newRouter = [
          {path: '/page1', name: 'page1', componentPath: 'views/page/page1', keep: true},
          {path: '/page2', name: 'page2', componentPath: 'views/page/page2'},
          {
            path: '/page3', name: 'page3', componentPath: 'views/page/page3', children: [
              {path: '/page3/demo', name: 'page3-demo', componentPath: 'views/page/page3Demo',}
            ]
          },
        ];
        resolve(newRouter)
      })

    }
  },
  modules: {}
})
