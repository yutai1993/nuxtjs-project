export default {
  namespaced: true,
  state: () => ({
    category: []
  }),
  mutations: {
    CATEGORY(state, data) {
      state.category = data
    }
  },
  actions: {
    async fetchCategory ({ commit }) {
      const result = await this.$category.getCategory()
      if (result && result.meta.status === 200) {
        commit('CATEGORY', result.message)
      }
    }
  },
  getters: {}
}
