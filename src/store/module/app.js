
export default {
  state: {
    direction: 'forward'
  },
  getters: {

  },
  mutations: {
    // 翻页方向
    updateDirection(state, payload) {
      state.direction = payload.direction
    }
  }
}
