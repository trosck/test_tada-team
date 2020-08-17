import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"

export default new Vuex.Store({
  state: {
    socket: null,
    chatList: [],
    isLogin: false,
    loading: false,
    username: "",
    someoneTyping: {
      bool: false,
      name: "",
    }
  },
  actions,
  getters,
  mutations,
})
