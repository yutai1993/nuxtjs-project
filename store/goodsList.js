export default {
  namespaced: true,
  state: () => ({
    result: {},
    list: [],
  }),
  mutations: {
    ADDLIST(state, result){
      state.result = result
      state.list.push(...result.message.goods)

    },
    DELGOODS(state){
      state.result = {}
      state.list = []

    }
  },
  actions: {
    async getGoods({commit}, params){
      const result = await this.$goodsList.getGoods(params)
      if (result && result.meta.status === 200) {
        commit('ADDLIST', result)
      }
    }
  },
  getters: {}
}
