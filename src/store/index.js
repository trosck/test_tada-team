import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import { byDateAsc } from "@/plugins/sort"

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

  mutations: {
    setUsername(state, username) {
      state.username = username
    },
    setLogin(state, value) {
      state.isLogin = value
    },
    addMessage(state, message) {
      state.chatList.push(message)
    },
    setSocket(state, socket) {
      state.socket = socket
    },
    setLoading(state, value) {
      state.loading = value
    },
  },

  actions: {
    loginUser({ commit }, username) {
      commit("setUsername", username)
      commit("setLogin", true)
    },

    resolveMessageData({ commit, getters }, event) {
      const username = getters.username
      try {
        const data = JSON.parse(event.data)
  
        if (data.typing) return
  
        data._type = data.name ? "message" : "invited"
        data._id = Date.now()
        data._self = data.name === username
  
        commit("addMessage", data)
      } catch(error) {
        console.error(error)
      }
    },

    initWSConnection({ commit, dispatch, getters }) {
  
      commit("setLoading", true)
  
      const username = getters.username
      const badData = JSON.stringify({
        data: { text: "Connection is closed" } 
      })
  
      try {
        const ws = new WebSocket(`${process.env.CHAT_WS_ADRESS}/ws?name=${username}`)
        ws.onmessage = event => dispatch("resolveMessageData", event)
        ws.onopen = () => commit("setLoading", false)
        ws.onclose = () => dispatch("resolveMessageData", badData)
        ws.onerror = () => dispatch("resolveMessageData", badData)
  
        commit("setSocket", ws)
      } catch(error) {
        console.error(error)
        commit("setLoading", false)
      }
    },

    sendMessage({ state }, text) {
      state.socket.send(
        JSON.stringify({ text }) 
      )
    },
  },

  getters: {
    isLogin: state => state.isLogin,
    username: state => state.username,
    loading: state => state.loading,
    chatListAscSorted: state => []
      .concat(state.chatList)
      .sort(byDateAsc('created')),
  },
})
