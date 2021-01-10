import { createStore } from 'vuex'

export default createStore({
  state: {
    player_list: [],
    search_text: '',
  },
  mutations: {
    addPlayerList(state, val) {
      for (let i = 0; i < state.player_list.length; i++) {
        if (state.player_list[i].rid === val.rid) return
      }
      state.player_list.push(val)
    },
    setSearchText(state, val) {
      state.search_text = val
    },
  },
  getters: {
    getPlayerList(state) {
      return state.player_list
    },
    getSearchText(state) {
      return state.search_text
    },
  },
})
