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
    username: '',
    someoneTyping: {
      bool: false,
      name: '',
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

    resolveMessageData({ commit, getters: { username } }, message) {
      message._type = message.username ? "message" : "invited"
      message._self = message.username === username
      commit("addMessage", message)
    },

    async initWSConnection({ commit, dispatch }) {

      commit("setLoading", true)
  
      return new Promise((resolve, reject) => {
        const ws = new WebSocket(process.env.VUE_APP_CHAT_WS_ADRESS)

        ws.onmessage = ({ data: eventData }) => {
          const { type, data } = JSON.parse(eventData)

          switch(type) {

            case 'get-all': {
              return data.forEach(
                item => dispatch("resolveMessageData", item)
              )
            }

            case 'push': {
              return dispatch("resolveMessageData", data)
            }
          }
        }

        ws.onopen = () => {
          commit("setLoading", false)
          resolve()
        }

        const onClose = () => {
          reject()
          dispatch(
            "resolveMessageData",
            JSON.stringify({
              data: { text: "Connection is closed" } 
            })
          )
        }

        ws.onclose = onClose
        ws.onerror = onClose

        commit("setSocket", ws)
      })
    },

    async loadAllMessages({ dispatch }) {
      dispatch(
        'sendMessage',
        { type: 'get-all' }
      )
    },

    async sendMessage(
      { state: { username, socket } },
      { value = '', type = 'push' }
    ) {
      socket.send(
        JSON.stringify({
          value,
          username,
          type
        })
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
