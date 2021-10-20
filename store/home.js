export default {
  namespaced: true,
  state: () => ({
    swiper: [],
    navigation: [],
    building: []
  }),
  mutations: {
    SETSWIPER(state, data) {
      state.swiper = data
    },
    SETNAVIGATION(state, data) {
      state.navigation = data
    },
    BUILDING(state, data) {
      state.building = data
    }
  },
  actions: {
    /* 轮播图 */
    async fetchSwiper({ commit }) {
      let result = await this.$home.getSwiper()
      if (result && result.meta.status === 200) {
        commit('SETSWIPER', result.message)
      }
    },

    /* 导航 */
    async fetchNavigation({ commit }) {
      let result = await this.$home.getNavigation()
      if (result && result.meta.status === 200) {
        commit('SETNAVIGATION', result.message)
      }
    },
    /* 楼层 */
    async fetchBuilding({ commit }) {
      let result = await this.$home.getBuilding()
      if (result && result.meta.status === 200) {
        commit('BUILDING', result.message)
      }
    }
  },
  getters: {}
}
