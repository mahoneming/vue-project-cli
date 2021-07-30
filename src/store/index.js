import Vue from 'vue';
import Vuex from 'vuex';
import demo from './module/demo';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters,
  modules: {
    demo,
  },
});
