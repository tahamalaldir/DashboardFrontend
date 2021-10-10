import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { mini: false },
  mutations: {
    changeDrawer(state) {
      if (state.mini === false) {
        state.mini = true;
      } else if (state.mini === true) {
        state.mini = false;
      }
    },
  },
  actions: {},
  modules: {},
  getters: {
    getMini: (state) => {
      return state.mini;
    },
  },
});
