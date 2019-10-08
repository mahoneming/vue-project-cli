import Vue from 'vue'
import Vuex from 'vuex'
import { getNewsList } from '@/api/index'
import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newsInfo: {
      rows: [{ titleImgUrl: '' }],
      total: 0
    },
  },
  getters: {
    newsListOther: state => { //通过属性访问
      return state.newsInfo.rows.filter((item, index) => index > 0)
    },
    pageTotal: state => {
      return state.newsInfo.total
    }
  },
  mutations: {
    getNewsList(state, params) {
      state.newsInfo = params
    },
  },
  actions: {
    async getNewsList({ commit }, params) {
      const res = await getNewsList(params)
      if (res.data.rows.length) {
        commit('getNewsList', res.data)
        // console.log(this.state.getters)
      }
    },
  },
  modules: {
    user,
    app
  }
})
